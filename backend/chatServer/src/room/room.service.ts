import { Injectable } from '@nestjs/common';
import { Question } from '../event/dto/OutgoingMessage.dto';
import { WsException } from '@nestjs/websockets';
import { CHATTING_SOCKET_ERROR } from '../event/constants';

interface Room {
  hostId: string;
  questions: Question[]
}


//TODO: Error WSException 으로 바꾸기

@Injectable()
export class RoomService {
  rooms = new Map<string, Room>(); // roomId: Room

  // 방 생성
  createRoom(roomId: string, hostId: string) {
    if (this.rooms.has(roomId)) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EXISTED);

    this.rooms.set(roomId, {
      hostId,
      questions: [],
    });
  }

  // 방 삭제
  deleteRoom(roomId: string) {
    if (!this.rooms.has(roomId)) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);

    this.rooms.delete(roomId);
  }

  // 방 조회
  getRoom(roomId: string) {
    return this.rooms.get(roomId) || undefined;
  }

  // 질문 추가
  addQuestionAndReturnQuestion(
    roomId: string,
    question: Omit<Question, 'questionId'>,
  ): Question {
    const room = this.rooms.get(roomId);
    if (!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);

    const questionId: Pick<Question, 'questionId'> = { questionId: room.questions.length + 1 }; // 질문 번호는 자동 증가
    const newQuestion = { ...question, ...questionId };
    room.questions.push(newQuestion);
    return newQuestion;
  }

  // 특정 질문 완료 처리
  markQuestionAsDone(roomId: string, questionId: number) {
    const room = this.rooms.get(roomId);
    if (!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);

    const question = room.questions[questionId];

    if (!question) throw new WsException(CHATTING_SOCKET_ERROR.QUESTION_EMPTY);

    question.questionDone = true;
  }

  // 방에 속한 모든 질문 조회
  getQuestions(roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);

    return room.questions;
  }

  getQuestionsNotDone(roomId: string){
    const room = this.rooms.get(roomId);
    if (!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);

    return room.questions.filter((q) => !q.questionDone);
  }

  // 특정 질문 조회
  getQuestion(roomId: string, questionId: number) {
    const room = this.rooms.get(roomId);
    if (!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);

    return room.questions.find((q) => q.questionId === questionId) || undefined;
  }
}
