import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserRepository {
  users = new Map<string, User>();

  createUser(userId: string, user: User) {
    this.users.set(userId, user);
    return user;
  }

  getUserByClientId(userId: string) {
    if(this.users.has(userId)) return this.users.get(userId)!;
    return undefined;
  }

  deleteUserByClientId(userId: string) {
    if(!this.users.has(userId)) return false;

    this.users.delete(userId);
    return true;
  }
}
