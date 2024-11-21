type OutgoingMessageType = 'normal' | 'question' | 'notice';

class OutgoingMessageDto {
  userId: string = '';
  nickname: string = '';
  color: string = '';
  msg?: string;
  msgTime: string = new Date().toISOString();
  msgType: OutgoingMessageType = 'normal';
  questionId?: number; // QuestionList 의 Key 값과 동일
  questionDone?: boolean;
}

class Question extends OutgoingMessageDto {}

export { OutgoingMessageDto, Question };
