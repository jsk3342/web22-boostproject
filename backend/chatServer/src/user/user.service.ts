import { Injectable } from '@nestjs/common';
import { getRandomAdjective, getRandomBrightColor, getRandomNoun } from '../utils/random';
import { User } from './user.interface';
import { UserRepository } from './user.repository';

function createRandomNickname(){
  return `${getRandomAdjective()} ${getRandomNoun()}`;
}

function createRandomUserInstance(clientId: string): User {
  return {
    clientId,
    nickname: createRandomNickname(),
    color: getRandomBrightColor()
  };
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {};
  createUser(userId:string, clientId: string): User {
    // 이미 존재하는 유저인지 확인
    const isUserAlreadyExist = this.userRepository.getUserByClientId(userId);
    if(isUserAlreadyExist) return isUserAlreadyExist;

    // 랜덤 닉네임, 랜덤 색상으로 새로운 유저 하나 생성
    const newUser = createRandomUserInstance(clientId);
    return this.userRepository.createUser(userId, newUser);
  }

  deleteUser(userId:string): boolean {
    // 이미 존재하는 유저인지 확인
    const isUserAlreadyExist = this.userRepository.getUserByClientId(userId);
    if(!isUserAlreadyExist) return false;

    return this.userRepository.deleteUserByClientId(userId);
  }

  getUserByUserId(userId: string) {
    return this.userRepository.getUserByClientId(userId);
  }
}
