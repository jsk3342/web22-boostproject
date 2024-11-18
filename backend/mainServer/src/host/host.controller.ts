import { Controller, Post, Get, Req, Res, HttpException, HttpStatus, Body, Query } from '@nestjs/common';
import { HostService } from './host.service.js';
import { hostKeyPairDto } from '../dto/hostKeyPairDto.js';
import { Request, Response } from 'express';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemoryDBService } from '../memory-db/memory-db.service.js';
import { memoryDbDtoFromLiveVideoRequestDto } from '../dto/memoryDbDto.js';
import { LiveVideoRequestDto } from '../dto/liveVideoDto.js';


@Controller('host')
@ApiTags('Host API')
export class HostController {
  constructor( private readonly memoryDBService: MemoryDBService,  private readonly hostService: HostService) { }

  @Post('/key')
  @ApiOperation({ summary: 'Host Stream, Session Key Generate API', description: 'Host용 스트림키와 세션키를 생성합니다.' })
  @ApiCreatedResponse({ description: '스트림키, 세션키를 생성한다.' })
  async generateStreamKey(@Body() requestDto: hostKeyPairDto, @Req() req: Request, @Res() res: Response) {
    try {
      const host = req.headers['host'] as string;
      const contentType = req.headers['content-type'];

      if (!host || !contentType || !requestDto.userId) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
      if (contentType !== 'application/json') {
        throw new HttpException('Content-Type must be application/json', HttpStatus.BAD_REQUEST);
      }

      const [streamKey, sessionKey] = await this.hostService.generateStreamKey(requestDto);
      if (!this.memoryDBService.findByUserId(requestDto.userId)) {
        this.memoryDBService.create({userId: requestDto.userId, streamKey: streamKey, sessionKey:sessionKey});
      }
      res.status(HttpStatus.OK).json({ 'streamKey': streamKey, 'sessionKey':sessionKey });
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

  @Get('/session')
  @ApiOperation({ summary: 'Session Key To Session Key API', description: 'Host의 Stream Key를 통해 Session Key를 찾습니다.' })
  @ApiCreatedResponse({ description: '스트림 키를 통해 세션키를 전달 받습니다.' })
  async findSession(@Query('streamKey') streamKey: string, @Req() req: Request, @Res() res: Response) {
    try {
      const sessionKey = this.memoryDBService.findByStreamKey(streamKey);
      if (!sessionKey) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
      sessionKey.state = true;
      this.memoryDBService.updateBySessionKey(streamKey, sessionKey);
      res.status(HttpStatus.OK).json({'session-key': sessionKey});
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

  @Post('/update')
  @ApiOperation({ summary: 'Host Broadcast Data Update API', description: '호스트의 방송 정보를 업데이트합니다.' })
  @ApiResponse({ status:200,  description: '호스트의 방송 정보를 업데이트 했습니다.' })
  async updateBroadcastData(@Body() requestDto: LiveVideoRequestDto, @Res() res: Response) {
    try {
      const nowUserData = this.memoryDBService.findByUserId(requestDto.userId);
      if (!nowUserData)
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      this.memoryDBService.updateByUserId(requestDto.userId, memoryDbDtoFromLiveVideoRequestDto(nowUserData, requestDto));
      res.status(HttpStatus.OK).json({
        status : 'success',
        data : requestDto
      });
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

  @Get('/state')
  @ApiOperation({summary : 'Response this session is live", description: "현재 방송 세션이 라이브 상태인지 반환합니다.'})
  @ApiResponse({status : 200, description : '현재 방송 상태에 대한 응답'})
  async getBroadcastState(@Query('sessionKey') sessionKey : string, @Res() res : Response) {
    const liveState = this.memoryDBService.findBySessionKey(sessionKey);
    if (!liveState) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    res.status(200).json({
      state : liveState.state
    });
  }
}