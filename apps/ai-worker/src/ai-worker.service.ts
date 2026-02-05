import { Injectable } from '@nestjs/common';

@Injectable()
export class AiWorkerService {
  getHello(): string {
    return 'Hello World!';
  }
}
