// host.controller.ts
import { Controller, Post, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { HostService } from './host.service';
import { Request, Response } from 'express';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post("/")
  async generateStreamKey(@Req() req: Request, @Res() res: Response) {
    try {
      const host = req.headers['host'] as string;
      const contentType = req.headers['content-type'];
      const { uuid } = req.body;

      if (!host || !contentType || contentType !== 'application/json' || !uuid) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }

      const hostData = await this.hostService.generateStreamKey(uuid);
      res.status(HttpStatus.OK).json({ 'host-data': hostData });
    } catch (error) {
      res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        statusCode: 503,
        message: 'Server logic error',
      });
    }
  }
}