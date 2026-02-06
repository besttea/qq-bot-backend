import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { QQBotConfig } from './interfaces/qq-config.interface';

@Injectable()
export class QQService {
  private readonly logger = new Logger(QQService.name);
  // Note: Sandbox environment uses https://sandbox.api.sgroup.qq.com
  // Production uses https://api.sgroup.qq.com
  // Assuming production based on user input, but we can make it configurable.
  private readonly baseUrl = 'https://api.sgroup.qq.com'; 
  private readonly config: QQBotConfig;

  constructor(private readonly httpService: HttpService) {
    this.config = {
      appId: process.env.QQ_APP_ID || '',
      token: process.env.QQ_TOKEN || '',
      appSecret: process.env.QQ_APP_SECRET || '',
    };

    if (!this.config.appId || !this.config.token || !this.config.appSecret) {
      this.logger.warn('QQ Bot credentials are not fully configured in .env');
    }
  }

  getAppSecret(): string {
    return this.config.appSecret;
  }

  async sendMessage(channelId: string, content: string, msgId?: string) {
    if (!channelId) {
      this.logger.error('Channel ID is missing');
      return;
    }

    const url = `${this.baseUrl}/channels/${channelId}/messages`;
    const headers = {
      Authorization: `Bot ${this.config.appId}.${this.config.token}`,
      'Content-Type': 'application/json',
    };
    
    const data: any = { content };
    if (msgId) {
      data.msg_id = msgId; // Reply to a specific message to avoid "dangling" messages
    }

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, data, { headers })
      );
      this.logger.log(`Message sent to channel ${channelId}: ${content}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to send message: ${error.message}`, error.response?.data);
      // Don't throw to avoid crashing the webhook handler
      return null;
    }
  }
}
