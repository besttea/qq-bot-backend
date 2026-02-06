import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {
    rawBody: true, // Enable raw body access
  });
  await app.listen(process.env.GATEWAY_PORT ?? 3000);
}
bootstrap();
