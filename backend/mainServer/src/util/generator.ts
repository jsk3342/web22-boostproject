import crypto from 'crypto';

export function randomKey(uuid: string, salt: string, length: number = 20) {
  const hash = crypto.createHmac('sha256', salt).update(uuid).digest('hex');
  return hash.substring(0, length);
}