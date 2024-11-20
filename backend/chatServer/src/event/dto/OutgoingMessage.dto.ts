class OutgoingMessageDto {
  userId: string = '';
  nickname: string = '';
  color: string = '';
  msg?: string;
  msgTime: string = new Date().toISOString();
}

export { OutgoingMessageDto };
