import { MemoryDB } from '../memory-db/memory-db.decorator.js';
import { MemoryDbDto, ChannelDto } from './memoryDbDto.js';

@MemoryDB
export class LiveCurationDto {
  id: number = 0;
  liveId: string = '';
  liveTitle: string = '';
  liveImageUrl: string = '';
  defaultThumbnailImageUrl: string = 'https://kr.object.ncloudstorage.com/web22/static/liboo_default_thumbnail.png';
  concurrentUserCount: number = 0;
  channel: ChannelDto = {
    channelId : '',
    channelName : ''
  };
}

export function fromLiveCurationDto(memoryDbDto: MemoryDbDto): LiveCurationDto {
  const {
    id,
    liveId,
    liveTitle,
    liveImageUrl,
    defaultThumbnailImageUrl = 'https://kr.object.ncloudstorage.com/web22/static/liboo_default_thumbnail.png',
    concurrentUserCount,
    channel,
  } = memoryDbDto;

  return {
    id,
    liveId,
    liveTitle,
    liveImageUrl,
    defaultThumbnailImageUrl,
    concurrentUserCount,
    channel
  };
}
