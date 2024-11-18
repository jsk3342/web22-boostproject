export const CHATTING_TYPES = {
  NORMAL: 'normal',
  QUESTION: 'question',
  NOTICE: 'notice'
} as const;

export const CHATTING_SOCKET_DEFAULT_EVENT = {
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room'
} as const;

export const CHATTING_SOCKET_RECIEVE_EVENT = {
  NORMAL: 'recieve_normal_chat',
  QUESTION: 'recieve_question',
  QUESTION_DONE: 'recieve_question_done',
  NOTICE: 'recieve_notice'
} as const;

export const CHATTING_SOCKET_SEND_EVENT = {
  NORMAL: 'send_normal_chat',
  QUESTION: 'send_question',
  QUESTION_DONE: 'send_question_done',
  NOTICE: 'send_notice'
} as const;
