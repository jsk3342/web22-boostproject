export type ChattingTypes = 'normal' | 'question' | 'notice';

export interface MessageReceiveData {
  userId: string;
  nickname: string;
  color: string;
  msg: string;
  msgTime: Date;
}

export interface MessageReceiveDataWithType extends MessageReceiveData {
  msgType: ChattingTypes;
  questionList?: MessageReceiveData[];
}

export interface MessageSendData {
  roomId: string;
  userId: string;
  msg: string | null;
}
