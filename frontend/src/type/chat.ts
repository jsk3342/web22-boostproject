export type ChattingTypes = 'normal' | 'question' | 'notice';

export interface MessageReceiveData {
  socketId: string;
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
  socketId: string;
  userId: string;
  msg: string | null;
}
