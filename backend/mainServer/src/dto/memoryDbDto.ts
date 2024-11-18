import { MemoryDB } from "../memory-db/memory-db.decorator.js";

@MemoryDB
export class MemoryDbDto {
  id: number = 0;
  userId: string = "";
  streamKey: string = "";
  sessionKey: string = "";
  liveId: string = "";
  liveTitle: string = "";
  liveImageUrl: string = "";
  defaultThumbnailImageUrl: string = "";
  concurrentUserCount: number = 0;
  channelId: string = "";
  channelName: string = "";
  category: string = "";
  tags: Array<string> = [];

  constructor(data?: Partial<MemoryDbDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
