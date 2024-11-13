import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';

function generateRandomKey(uuid: string, salt: string) {
  const hash = crypto.createHmac('sha256', salt).update(uuid).digest('hex');
  return hash;
}

@Injectable()
export class HostService {
  async generateStreamKey(uuid: string): Promise<Array<string>> {
    dotenv.config({path: path.resolve('../.env')});
    const streamKey = generateRandomKey(uuid, process.env.STREAM_KEY_SALT || '');
    const sessionKey = generateRandomKey(uuid, process.env.SESSION_KEY_SALT || '');
    return [streamKey, sessionKey];
  }
}