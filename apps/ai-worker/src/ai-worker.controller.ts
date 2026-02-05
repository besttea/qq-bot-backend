import { Controller, Get } from '@nestjs/common';
import { AiWorkerService } from './ai-worker.service';

@Controller()
export class AiWorkerController {
  constructor(private readonly aiWorkerService: AiWorkerService) {}

  @Get()
  getHello(): string {
    return this.aiWorkerService.getHello();
  }
}
