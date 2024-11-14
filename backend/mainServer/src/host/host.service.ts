import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import { ApiProperty } from '@nestjs/swagger';

export class keyGenerateRequestDto {
  @ApiProperty({example: 'this_is_userId', description: '클라이언트마다 가지는 랜덤한 userId 값'})
    userId: string = '';
}

function generateRandomKey(uuid: string, salt: string) {
  const hash = crypto.createHmac('sha256', salt).update(uuid).digest('hex');
  return hash;
}

@Injectable()
export class HostService {
  async generateStreamKey(requestDto: keyGenerateRequestDto): Promise<Array<string>> {
    dotenv.config({path: path.resolve('../.env')});
    const streamKey = generateRandomKey(requestDto.userId, process.env.STREAM_KEY_SALT || '');
    const sessionKey = generateRandomKey(requestDto.userId, process.env.SESSION_KEY_SALT || '');
    return [streamKey, sessionKey];
  }
}