import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HostModule } from './host/host.module.js';
import { StreamsModule } from './streams/streams.module.js';

@Module({
  imports: [HostModule, StreamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


