import { Injectable, OnModuleInit } from '@nestjs/common';
import { MemoryDBService } from '../memory-db/memory-db.service.js';
import { MemoryDbDto } from '../dto/memoryDbDto.js';

@Injectable()
export class MockDataService implements OnModuleInit {
  private mockData : MemoryDbDto[] = [
    new MemoryDbDto({userId : 'test_user1', 
      streamKey : 'test1_stream', 
      sessionKey : 'test1_session', 
      liveId : 'test1_stream', 
      liveTitle : 'test1 title',
      category : 'test1 category',
      tags : ['test1_tag1', 'test1_tag2', 'test1_tag3']
    }),
    new MemoryDbDto({userId : 'test_replay', 
      streamKey : 'replay_stream', 
      sessionKey : 'replay_session', 
      liveId : 'replay_session', 
      liveTitle : 'replay title',
      category : 'replay category',
      tags : ['replay_tag1', 'replay_tag2'],
      startDate : new Date(),
      endDate : new Date(Date.now() + 10 * 60 * 1000),
    })
  ];

  constructor(private readonly memoryDbService : MemoryDBService) {}

  // In-Memory 데이터베이스 초기화 메서드
  initializeData() {
    this.mockData.forEach((data) => {
      this.memoryDbService.create(data);
    });
  }

  // 모듈 초기화 시 실행
  onModuleInit() {
    this.initializeData();
  }
}
