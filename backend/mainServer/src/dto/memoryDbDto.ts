import { MemoryDB } from '../memory-db/memory-db.decorator.js';
import { LiveVideoRequestDto } from './liveVideoDto.js';

export class ChannelDto {
  channelId: string = '';
  channelName: string = '';
}

@MemoryDB
export class MemoryDbDto {
  id: number = 0;
  userId: string = '';
  streamKey: string = '';
  sessionKey: string = '';
  liveId: string = '';
  liveTitle: string = '';
  liveImageUrl: string = '';
  defaultThumbnailImageUrl: string = '';
  concurrentUserCount: number = 0;
  channel: ChannelDto = {
    channelId : 'null',
    channelName : 'none',
  };
  category: string = '';
  tags: Array<string> = [];

  constructor(data?: Partial<MemoryDbDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export function updateMemoryDbDtoFromLiveVideoRequestDto(
  memoryDbDto: MemoryDbDto,
  liveVideoDto: LiveVideoRequestDto
): MemoryDbDto {
  memoryDbDto.userId = liveVideoDto.userId;
  memoryDbDto.liveTitle = liveVideoDto.liveTitle;
  memoryDbDto.defaultThumbnailImageUrl = liveVideoDto.defaultThumbnailImageUrl;
  memoryDbDto.category = liveVideoDto.category;
  memoryDbDto.tags = [...liveVideoDto.tags];

  return memoryDbDto;
}