export type ChattingTypes = 'normal' | 'question' | 'notice';

// 기본 서버 응답 데이터
export interface MessageReceiveData {
  userId: string;
  nickname: string;
  color: string;
  msg: string | null;
  msgTime: Date;
  msgType: ChattingTypes;
  questionId?: number;
  questionDone?: boolean;
}

export interface MessageSendData {
  roomId: string;
  userId: string;
  questionId?: number;
  msg?: string;
}
