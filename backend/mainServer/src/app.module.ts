import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HostController } from './host/host.controller.js';
import { HostService } from './host/host.service.js';

@Module({
  imports: [],
  controllers: [AppController, HostController],
  providers: [AppService, HostService],
})
export class AppModule {}
