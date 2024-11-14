import { Controller, Post, Req, Res, HttpException, HttpStatus, Body } from '@nestjs/common';
import { keyGenerateRequestDto, HostService } from './host.service.js';
import { Request, Response } from 'express';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('host')
@ApiTags('Host API')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post('/key')
  @ApiOperation({ summary: 'Host Stream, Session Key Generate API', description: 'Host용 스트림키와 세션키를 생성합니다.' })
  @ApiCreatedResponse({ description: '스트림키, 세션키를 생성한다.' })
  async generateStreamKey(@Body() requestDto: keyGenerateRequestDto, @Req() req: Request, @Res() res: Response) {
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
      res.status(HttpStatus.OK).json({ 'stream-key': streamKey, 'session-key':sessionKey });
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