class IncomingMessageDto {
  roomId: string = '';
  userId: string = '';
  msg?: string;
  questionId?:number;
}

export { IncomingMessageDto, };
