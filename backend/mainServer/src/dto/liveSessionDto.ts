import { ApiProperty } from '@nestjs/swagger';
import { MemoryDB } from '../memory-db/memory-db.decorator.js';
import { ChannelDto, MemoryDbDto } from './memoryDbDto.js';

@MemoryDB
export class LiveVideoRequestDto {
  @ApiProperty({example: 'this_is_userId', description: '클라이언트마다 가지는 랜덤한 userId 값'})
    userId: string = '';

  @ApiProperty({example: 'live title', description: '방송 제목'})
    liveTitle: string = '';

  @ApiProperty({example: '', description: '방송 썸네일 이미지(base64)'})
    defaultThumbnailImageUrl: string = '';

  @ApiProperty({example: 'category', description: '방송 카테고리'})
    category: string = '';

  @ApiProperty({example: '쾌적한 컨퍼런스 환경을 위해 상대방을 존중하는 언어를 사용해 주시길 바랍니다. 모두가 배움과 소통을 즐길 수 있는 문화를 함께 만들기에 동참해주세요.', description: '방송 공지 (비어있을 경우 기본 값으로 설정)'})
    notice: string = '';

  @ApiProperty({example: 'host name', description: '호스트 이름'})
    hostName: string = '';

  @ApiProperty({example: ['tag1', 'tag2', 'tag3'], description: '방송 태그'})
    tags: Array<string> = [];
}

@MemoryDB
export class LiveSessionResponseDto {
  id: number = 0;
  liveId: string = '';
  liveTitle: string = '';
  liveImageUrl: string = '';
  defaultThumbnailImageUrl: string = '';
  concurrentUserCount: number = 0;
  channel : ChannelDto = {
    channelId: '',
    channelName: '',
  };
  category: string = '';
  tags: Array<string> = [];
}


export function fromLiveSessionDto(memoryDbDto: MemoryDbDto): LiveSessionResponseDto {
  const {
    id,
    sessionKey,
    liveTitle,
    liveImageUrl,
    defaultThumbnailImageUrl,
    concurrentUserCount,
    channel,
    category,
    tags,
  } = memoryDbDto;

  return {
    id,
    liveId : sessionKey,
    liveTitle,
    liveImageUrl,
    defaultThumbnailImageUrl,
    concurrentUserCount,
    channel,
    category,
    tags,
  };
}
