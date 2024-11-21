import { LiveVideoRequestDto } from './liveSessionDto.js';
import { DEFAULT_VALUE } from '../common/constants.js';

export class ChannelDto {
  channelId: string = '';
  channelName: string = '';
}

export class MemoryDbDto {
  id: number = 0;
  userId: string = '';
  streamKey: string = '';
  sessionKey: string = '';
  liveId: string = '';
  liveTitle: string = '';
  liveImageUrl: string = '';
  defaultThumbnailImageUrl: string = DEFAULT_VALUE.THUMBNAIL_IMG_URL;
  concurrentUserCount: number = 0;
  channel: ChannelDto = {
    channelId : 'null',
    channelName : DEFAULT_VALUE.HOST_NAME,
  };
  notice : string = DEFAULT_VALUE.NOTICE;
  category: string = '';
  tags: Array<string> = [];
  state : boolean = false;
  startDate : Date | null = null;
  endDate : Date | null = null;

  constructor(data?: Partial<MemoryDbDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export function memoryDbDtoFromLiveVideoRequestDto(
  memoryDbDto: MemoryDbDto,
  liveVideoDto: LiveVideoRequestDto
): MemoryDbDto {
  memoryDbDto.userId = liveVideoDto.userId;
  memoryDbDto.liveTitle = liveVideoDto.liveTitle;
  memoryDbDto.defaultThumbnailImageUrl = liveVideoDto.defaultThumbnailImageUrl;
  memoryDbDto.category = liveVideoDto.category;
  memoryDbDto.tags = [...liveVideoDto.tags];
  memoryDbDto.notice = liveVideoDto.notice;
  memoryDbDto.channel.channelName = liveVideoDto.hostName;

  return memoryDbDto;
}