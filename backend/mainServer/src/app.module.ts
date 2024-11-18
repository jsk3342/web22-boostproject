import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HostModule } from './host/host.module.js';
import { ViewerModule } from './viewer/viewer.module.js';

@Module({
  imports: [HostModule, ViewerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
