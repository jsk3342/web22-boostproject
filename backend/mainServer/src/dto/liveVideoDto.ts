import { ApiProperty } from '@nestjs/swagger';
import { MemoryDB } from "../memory-db/memory-db.decorator.js";
import { ChannelDto } from './memoryDbDto.js';

@MemoryDB
export class LiveVideoDto {
  id: number = 0;
  liveId: string = "";
  liveTitle: string = "";
  liveImageUrl: string = "";
  defaultThumbnailImageUrl: string = "";
  concurrentUserCount: number = 0;
  channel : ChannelDto = {
    channelId: "",
    channelName: "",
  }

  category: string = "";
  tags: Array<string> = [];
}