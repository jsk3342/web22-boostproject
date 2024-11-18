import { MemoryDB } from "../memory-db/memory-db.decorator.js";

export class ChannelDto {
  channelId: string = "";
  channelName: string = "";
}

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
  channel: ChannelDto = {
    channelId : "null",
    channelName : "none",
  };
  category: string = "";
  tags: Array<string> = [];

  constructor(data?: Partial<MemoryDbDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
