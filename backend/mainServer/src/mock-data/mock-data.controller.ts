import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemoryDBService } from '../memory-db/memory-db.service.js';

@ApiTags('Dev API')
@Controller('dev')
export class MockDataController {
  constructor(private readonly memoryDbService: MemoryDBService) {}

  @ApiOperation({ summary: 'Get all Session Info', description: '모든 방송 정보를 돌려줍니다.' })
  @ApiResponse({ status: 200, description: 'Returns all Session Info' })
  @Get('/all')
  getAllMockData() {
    return this.memoryDbService.findAll();
  }
}
