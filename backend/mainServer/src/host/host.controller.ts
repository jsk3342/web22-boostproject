import { Controller, Post, Get, Req, Res, HttpException, HttpStatus, Body, Query, Inject } from '@nestjs/common';
import { HostService } from './host.service.js';
import { hostKeyPairDto } from '../dto/hostKeyPairDto.js';
import { Request, Response } from 'express';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemoryDBService, MemoryDBManager } from '../memory-db/memory-db.service.js';
import { MemoryDbDto } from '../dto/memoryDbDto.js';


@Controller('host')
@ApiTags('Host API')
export class HostController {
  private readonly memoryDBService: MemoryDBService;
  _inMemory: { [key: string]: string };
  constructor( @Inject(MemoryDBManager) private readonly dbManager: MemoryDBManager,  private readonly hostService: HostService) {
    this.memoryDBService = new MemoryDBService();
    this.dbManager.register(MemoryDbDto, this.memoryDBService);
  }

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
      this.memoryDBService.create({id: 0, userId: requestDto.userId, streamKey: streamKey, sessionKey:sessionKey});
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
      if (!(streamKey in this._inMemory))
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      res.status(HttpStatus.OK).json({'session-key':this._inMemory[streamKey] });
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