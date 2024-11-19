import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { StreamsService } from './streams.service.js';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemoryDBService } from '../memory-db/memory-db.service.js';

@ApiTags('Stream Information API')
@Controller('streams')
export class StreamsController {
  constructor( private readonly memoryDBService: MemoryDBService,  private readonly streamsService: StreamsService) { }

  @Get('/random')
  @ApiOperation({ summary: 'Get 4ea Broadcas Info API', description: '랜덤하게 4개의 방송 정보를 받아온다.' })
  @ApiResponse({ status: 200, description: '랜덤한 4개의 방송 정보를 받았습니다.' })
  async findSession(@Res() res: Response) {
    try {
      const serchedData = this.memoryDBService.getRandomBroadcastInfo(4);
      res.status(HttpStatus.OK).json({info: serchedData});
    } catch (error) {
      if ((error as { status: number }).status === 400) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: (error as { response: Response }).response
        });
      }
      else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Server logic error',
        });
      }
    }
  }

  @Get('/live')
  @ApiOperation({summary : 'Get 8ea Live Session Info', description:'현재 진행 중인 라이브 정보를 최신부터 8개씩 불러옵니다.'})
  async getSession(@Res() res: Response) {
    try {
      const serchedData = this.memoryDBService.getBroadcastInfo(8);
      res.status(HttpStatus.OK).json({info: serchedData});
    } catch (error) {
      if ((error as { status: number }).status === 400) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: (error as { response: Response }).response
        });
      }
      else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Server logic error',
        });
      }
    }
  }
}