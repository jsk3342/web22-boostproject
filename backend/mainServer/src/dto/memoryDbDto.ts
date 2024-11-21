import { LiveVideoRequestDto } from './liveSessionDto.js';
import { DEFAULT_VALUE } from '../common/constants.js';

const defaultNotice = '쾌적한 컨퍼런스 환경을 위해 상대방을 존중하는 언어를 사용해 주시길 바랍니다. 모두가 배움과 소통을 즐길 수 있는 문화를 함께 만들기에 동참해주세요.';
const defaultThumbnail = 'https://kr.object.ncloudstorage.com/web22/static/liboo_default_thumbnail.png';

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
    channelName : 'none',
  };
  notice : string = DEFAULT_VALUE.NOTICE;
  category: string = '';
  tags: Array<string> = [];
  state : boolean = false;

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
  memoryDbDto.defaultThumbnailImageUrl = liveVideoDto.defaultThumbnailImageUrl ?? DEFAULT_VALUE.THUMBNAIL_IMG_URL;
  memoryDbDto.category = liveVideoDto.category;
  memoryDbDto.tags = [...liveVideoDto.tags];
  memoryDbDto.notice = liveVideoDto.notice ?? DEFAULT_VALUE.NOTICE;
  memoryDbDto.channel.channelName = liveVideoDto.hostName;

  return memoryDbDto;
}