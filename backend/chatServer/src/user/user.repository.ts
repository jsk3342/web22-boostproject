import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserRepository {
  users = new Map<string, User>();

  createUser(clientId: string, user: User) {
    this.users.set(clientId, user);
    return user;
  }

  getUserByClientId(clientId: string) {
    if(this.users.has(clientId)) return this.users.get(clientId)!;
    return undefined;
  }

  deleteUserByClientId(clientId: string) {
    if(!this.users.has(clientId)) return false;

    this.users.delete(clientId);
    return true;
  }
}
