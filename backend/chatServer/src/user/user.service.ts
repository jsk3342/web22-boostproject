import { Injectable } from '@nestjs/common';
import { getRandomAdjective, getRandomBrightColor, getRandomNoun } from '../utils/random';
import { User } from './user.interface';

function createRandomUsername(){
  return `${getRandomAdjective()} ${getRandomNoun()}`;
}

function createRandomUserInstance(): User {
  return {
    username: createRandomUsername(),
    color: getRandomBrightColor()
  };
}

@Injectable()
export class UserService {
  users = new Map<string, User>();

  createUser(clientId: string): User {
    if(this.users.has(clientId)) return this.users.get(clientId)!;

    const newUser = createRandomUserInstance();
    this.users.set(clientId, newUser);
    return newUser;
  }

  deleteUser(clientId: string): boolean {
    if(!this.users.has(clientId)) return false;

    this.users.delete(clientId);
    return true;
  }

  getUserByClientId(clientId: string) {
    if(!this.users.has(clientId)) return undefined;
    return this.users.get(clientId);
  }
}
