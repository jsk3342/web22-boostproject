import { Injectable } from '@nestjs/common';

@Injectable()
export class HostService {
  async generateStreamKey(uuid: string): Promise<string> {
    // UUID를 사용해 세션 정보를 생성하는 로직을 추가하세요.
    // 예를 들어, 특정한 방식으로 세션 키를 발급하는 기능을 구현할 수 있습니다.

    const sessionInfo = `session-info-for-${uuid}`; // 예시: 세션 정보 생성
    return sessionInfo;
  }
}
