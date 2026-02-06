import { Controller, Get, Param } from '@nestjs/common';
import { CoreServiceService } from './core-service.service';

@Controller()
export class CoreServiceController {
  constructor(private readonly coreServiceService: CoreServiceService) {}

  @Get()
  getHello(): string {
    return this.coreServiceService.getHello();
  }

  // Handle standard REST style: /bind/zhangsan/0001
  @Get('bind/:name/:id')
  async bindUser(@Param('name') name: string, @Param('id') id: string) {
    return this.coreServiceService.bindUser(name, id);
  }
}
