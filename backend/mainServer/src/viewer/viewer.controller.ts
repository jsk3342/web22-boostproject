import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { ViewerService } from './viewer.service.js';
import { Response } from 'express';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemoryDBService } from '../memory-db/memory-db.service.js';

@ApiTags('Viewer API')
@Controller('viewer')
export class ViewerController {
  constructor( private readonly memoryDBService: MemoryDBService,  private readonly viewerService: ViewerService) { }

  @Get('/main/random')
  @ApiOperation({ summary: 'get 4 broadcast data API', description: '랜덤하게 4개의 방송 정보를 받아온다.' })
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

  @Get('/main/live')
  @ApiOperation({summary : 'Get Live Session Info', description:'현재 진행 중인 라이브 정보를 cnt번째 부터 size개씩 불러옵니다.'})
  @ApiQuery({
    name: 'cnt',
    required: true,
    type: Number,
    description: '최신 순 정렬에서 몇 번째 방송부터 불러올지에 대한 쿼리 (시작값 0)'
  })
  @ApiQuery({
    name: 'size',
    required: true,
    type: Number,
    description: 'cnt 방송을 포함해서 몇 개의 정보를 불러올지에 대한 쿼리'
  })
  async getSession(@Query('cnt') cnt: number , @Query('size') size: number, @Res() res: Response) {
    try {
      const serchedData = this.memoryDBService.getBroadcastInfo(cnt, size);
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