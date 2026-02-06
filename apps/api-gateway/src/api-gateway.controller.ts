import { Controller, Get, Post, Body, Headers, Req, RawBodyRequest } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { QQPayload, QQMessage, QQService } from '@ZKLib/qq-sdk';
import * as ed from '@noble/ed25519';
import { Request } from 'express';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    private readonly qqService: QQService
  ) {}

  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }

  @Post('webhook')
  async handleQQEvent(
    @Body() body: QQPayload<any>,
    @Headers('x-signature-ed25519') signature: string,
    @Headers('x-signature-timestamp') timestamp: string,
    @Req() req: RawBodyRequest<Request>
  ) {
    // 1. Validation Logic for QQ Webhook Configuration (OpCode 13)
    if (body.op === 13 && body.d?.plain_token) {
      const plainToken = body.d.plain_token;
      const eventTs = body.d.event_ts;
      // ... (existing OpCode 13 logic) ...
      // Signature Calculation (Ed25519)
      const secret = this.qqService.getAppSecret();
      if (!secret) {
        console.error('[QQBot] AppSecret is missing! Cannot verify.');
        return { error: 'AppSecret missing' };
      }

      let seedStr = secret;
      while (seedStr.length < 32) {
        seedStr += seedStr;
      }
      const seedBytes = Buffer.from(seedStr.slice(0, 32), 'utf-8');

      const msg = Buffer.from(eventTs + plainToken, 'utf-8');
      const signatureBytes = await ed.sign(msg, seedBytes);
      const signatureHex = Buffer.from(signatureBytes).toString('hex');

      console.log(`[QQBot] Validation Response Signature: ${signatureHex}`);

      return {
        plain_token: plainToken,
        signature: signatureHex
      };
    }

    // 2. Event Dispatch (OpCode 0) - Security Verification
    if (body.op === 0) {
      // Verify Request Signature if headers are present
      if (signature && timestamp && req.rawBody) {
        const secret = this.qqService.getAppSecret();
        if (secret) {
          let seedStr = secret;
          while (seedStr.length < 32) { seedStr += seedStr; }
          const seedBytes = Buffer.from(seedStr.slice(0, 32), 'utf-8');
          const publicKey = await ed.getPublicKey(seedBytes);
          
          const msg = Buffer.from(timestamp + req.rawBody.toString('utf-8'), 'utf-8');
          const isValid = await ed.verify(signature, msg, publicKey);
          
          if (!isValid) {
            console.warn(`[QQBot] ⚠️ Invalid Signature! Rejecting event.`);
            return { error: 'Invalid Signature' };
          }
          console.log(`[QQBot] ✅ Signature Verified.`);
        }
      } else {
        console.warn(`[QQBot] ⚠️ Missing Signature Headers for Event!`);
        // In production, you might want to reject this.
      }

      if (body.t === 'AT_MESSAGE_CREATE') {
        const message = body.d;
        if (message) {
          console.log(`[QQBot] Received message from ${message.author.username}: ${message.content}`);
          const content = message.content.replace(/<@!?>/g, '').trim();
          await this.qqService.sendMessage(
            message.channel_id, 
            `Received: ${content}`, 
            message.id
          );
        }
      }
    }
    return { ack: true };
  }
}
