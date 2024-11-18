import { ApiProperty } from '@nestjs/swagger';
import { MemoryDB } from "../memory-db/memory-db.decorator.js";

@MemoryDB
export class LiveCurationDto {
  id: number = 0;
  liveId: string = "";
  liveTitle: string = "";
  liveImageUrl: string = "";
  defaultThumbnailImageUrl: string = "";
  concurrentUserCount: number = 0;
  channelId: string = "";
  channelName: string = "";
}