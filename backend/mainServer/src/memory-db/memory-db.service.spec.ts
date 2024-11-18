import { Test, TestingModule } from '@nestjs/testing';
import { MemoryDBService } from './memory-db.service';

describe('MemoryDbService', () => {
  let service: MemoryDBService<Object>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemoryDBService],
    }).compile();

    service = module.get<MemoryDBService<Object>>(MemoryDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
