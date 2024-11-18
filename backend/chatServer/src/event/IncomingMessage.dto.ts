class IncomingMessageDto {
  socketId: string = '';
  nickname: string = '';
  color: string = '';
  msg: string = '';
  msgTime: Date = new Date();
}

export { IncomingMessageDto };
