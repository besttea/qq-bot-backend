import { Module } from '@nestjs/common';
import { CoreServiceController } from './core-service.controller';
import { CoreServiceService } from './core-service.service';
import { AuthModule } from './auth/auth.module';
import { HomeworksModule } from './homeworks/homeworks.module';
import { DatabaseModule } from '@ZKLib/database';

@Module({
  imports: [AuthModule, HomeworksModule, DatabaseModule],
  controllers: [CoreServiceController],
  providers: [CoreServiceService],
})
export class CoreServiceModule {}
