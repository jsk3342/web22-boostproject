import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HostController } from './host/host.controller';
import { HostService } from './host/host.service';

@Module({
  imports: [],
  controllers: [AppController, HostController],
  providers: [AppService, HostService],
})
export class AppModule {}
