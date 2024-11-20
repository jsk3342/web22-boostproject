import { Injectable } from '@nestjs/common';
import { getRandomAdjective, getRandomBrightColor, getRandomNoun } from '../utils/random';
import { User } from './user.interface';
import { UserRepository } from './user.repository';

function createRandomNickname(){
  return `${getRandomAdjective()} ${getRandomNoun()}`;
}

function createRandomUserInstance(): User {
  return {
    nickname: createRandomNickname(),
    color: getRandomBrightColor()
  };
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {};
  createUser(clientId: string): User {
    // 이미 존재하는 유저인지 확인
    const isUserAlreadyExist = this.userRepository.getUserByClientId(clientId);
    if(isUserAlreadyExist) return isUserAlreadyExist;

    // 랜덤 닉네임, 랜덤 색상으로 새로운 유저 하나 생성
    const newUser = createRandomUserInstance();
    return this.userRepository.createUser(clientId, newUser);
  }

  deleteUser(clientId: string): boolean {
    // 이미 존재하는 유저인지 확인
    const isUserAlreadyExist = this.userRepository.getUserByClientId(clientId);
    if(!isUserAlreadyExist) return false;

    return this.userRepository.deleteUserByClientId(clientId);
  }

  getUserByClientId(clientId: string) {
    return this.userRepository.getUserByClientId(clientId);
  }
}
