import { Module } from '@nestjs/common';
import { CoreServiceController } from './core-service.controller';
import { CoreServiceService } from './core-service.service';
import { AuthModule } from './auth/auth.module';
import { HomeworksModule } from './homeworks/homeworks.module';

@Module({
  imports: [AuthModule, HomeworksModule],
  controllers: [CoreServiceController],
  providers: [CoreServiceService],
})
export class CoreServiceModule {}
