import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect, WsException
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  CHATTING_SOCKET_ERROR,
  CHATTING_SOCKET_DEFAULT_EVENT,
  CHATTING_SOCKET_RECEIVE_EVENT, CHATTING_SOCKET_SEND_EVENT
} from '../event/constants';
import { IncomingMessageDto } from '../event/dto/IncomingMessage.dto';
import { JoiningRoomDto } from '../event/dto/JoiningRoom.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
    server!: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    console.log('rooms=',client.rooms);
    client.leave(client.id);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // 특정 방에 참여하기 위한 메서드
  @SubscribeMessage(CHATTING_SOCKET_DEFAULT_EVENT.JOIN_ROOM)
  handleJoinRoom(client: Socket, payload: JoiningRoomDto) {
    const { roomId } = payload;
    client.leave(client.id);
    client.join(roomId);
    console.log(`${client.id} 가 ${roomId} 에 입장했습니다.`);
  }

  // 특정 방에서 나가기 위한 메서드
  @SubscribeMessage(CHATTING_SOCKET_DEFAULT_EVENT.LEAVE_ROOM)
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
  }

  // 방에 NORMAL 메시지를 보내기 위한 메서드
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.NORMAL)
  handleNormalMessage(client: Socket, payload: IncomingMessageDto) {
    const room = client.rooms.values().next().value;
    if(!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
    this.server.to(room).emit(CHATTING_SOCKET_RECEIVE_EVENT.NORMAL, payload);
  }

  // 방에 QUESTION 메시지를 보내기 위한 메서드
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.QUESTION)
  handleQuestionMessage(client: Socket, payload: IncomingMessageDto) {
    const room = client.rooms.values().next().value;
    if(!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
    this.server.to(room).emit(CHATTING_SOCKET_RECEIVE_EVENT.QUESTION, payload);
  }

  // 방에 QUESTION DONE 메시지를 보내기 위한 메서드
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.QUESTION_DONE)
  handleQuestionDoneMessage(client: Socket, payload: IncomingMessageDto) {
    const room = client.rooms.values().next().value;
    if(!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
    this.server.to(room).emit(CHATTING_SOCKET_RECEIVE_EVENT.QUESTION_DONE, payload);
  }

  // 방에 NORMAL 메시지를 보내기 위한 메서드
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.NOTICE)
  handleNoticeMessage(client: Socket, payload: IncomingMessageDto) {
    const room = client.rooms.values().next().value;
    if(!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
    this.server.to(room).emit(CHATTING_SOCKET_RECEIVE_EVENT.NOTICE, payload);
  }
}
