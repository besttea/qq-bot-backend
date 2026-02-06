import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { QQService } from './qq.service';

@Module({
  imports: [HttpModule],
  providers: [QQService],
  exports: [QQService],
})
export class QQSdkModule {}
