import { Test, TestingModule } from '@nestjs/testing';
import { AiWorkerController } from './ai-worker.controller';
import { AiWorkerService } from './ai-worker.service';

describe('AiWorkerController', () => {
  let aiWorkerController: AiWorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AiWorkerController],
      providers: [AiWorkerService],
    }).compile();

    aiWorkerController = app.get<AiWorkerController>(AiWorkerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(aiWorkerController.getHello()).toBe('Hello World!');
    });
  });
});
