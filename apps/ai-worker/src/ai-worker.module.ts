import { Module } from '@nestjs/common';
import { AiWorkerController } from './ai-worker.controller';
import { AiWorkerService } from './ai-worker.service';

@Module({
  imports: [],
  controllers: [AiWorkerController],
  providers: [AiWorkerService],
})
export class AiWorkerModule {}
