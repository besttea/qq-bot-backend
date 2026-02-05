import { NestFactory } from '@nestjs/core';
import { AiWorkerModule } from './ai-worker.module';

async function bootstrap() {
  const app = await NestFactory.create(AiWorkerModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
