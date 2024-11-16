import dotenv from 'dotenv';
import path from 'path';
import { Injectable } from '@nestjs/common';
import { hostKeyPairDto } from './dto/hostKeyPairDto.js';
import { randomKey } from '../util/generator.js';

@Injectable()
export class HostService {
  async generateStreamKey(requestDto: hostKeyPairDto): Promise<Array<string>> {
    dotenv.config({path: path.resolve('../.env')});
    const streamKey = randomKey(requestDto.userId, process.env.STREAM_KEY_SALT || '');
    const sessionKey = randomKey(requestDto.userId, process.env.SESSION_KEY_SALT || '');
    return [streamKey, sessionKey];
  }
}