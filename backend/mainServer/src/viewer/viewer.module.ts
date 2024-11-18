import { Module } from '@nestjs/common';
import { ViewerController } from './viewer.controller.js';
import { ViewerService } from './viewer.service.js';
import { MemoryDBModule } from '../memory-db/memory-db.module.js';

@Module({
  imports : [MemoryDBModule],
  controllers: [ViewerController],
  providers: [ViewerService]
})
export class ViewerModule {}
