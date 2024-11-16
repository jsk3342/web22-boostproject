import crypto from 'crypto';

export function randomKey(uuid: string, salt: string) {
  const hash = crypto.createHmac('sha256', salt).update(uuid).digest('hex');
  return hash;
}