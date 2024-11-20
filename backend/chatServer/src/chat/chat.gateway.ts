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
import { UserService } from '../user/user.service';
import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { OutgoingMessageDto } from '../event/dto/OutgoingMessage.dto';
import { User } from '../user/user.interface';


@Injectable()
export class ChatValidationGuard implements CanActivate {
  constructor(private userService: UserService) {};

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient<Socket>();
    const payload = context.switchToWs().getData();
    const { userId } = payload;
    const user = this.userService.getUserByUserId(userId);

    console.log('guard', payload);
    console.log(user, client.id, user?.clientId);
    if(!!user && client.id === user?.clientId) {
      client.data = user;
      return true;
    }

    throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
  }
}

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private userService: UserService){};

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
    // DM 용 room 나가기
    client.leave(client.id);

    const { roomId, userId } = payload;
    client.join(roomId);
    // TODO: 만약 RoomList 에 없던 roomId 라면 RoomList 에 현재 userId 를 호스트로 등록해야한다.

    console.log(`${client.id} 가 ${roomId} 에 입장했습니다.`);

    console.log(this.userService.createUser(userId, client.id));
  }

  // 특정 방에서 나가기 위한 메서드
  @SubscribeMessage(CHATTING_SOCKET_DEFAULT_EVENT.LEAVE_ROOM)
  handleLeaveRoom(client: Socket, room: string) {
    this.userService.deleteUser(client.id);
    client.leave(room);
  }

  // 방에 NORMAL 메시지를 보내기 위한 메서드
  @UseGuards(ChatValidationGuard)
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.NORMAL)
  handleNormalMessage(client: Socket, payload: IncomingMessageDto) {
    const room = client.rooms.values().next().value;
    if(!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
    const user: User = client.data;
    const outgoingMessage: OutgoingMessageDto = {
      userId: payload.userId,
      nickname: user.nickname,
      color: user.color,
      msg: payload.msg,
      msgTime: new Date().toISOString()
    };
    this.server.to(room).emit(CHATTING_SOCKET_RECEIVE_EVENT.NORMAL, outgoingMessage);
  }

  // 방에 QUESTION 메시지를 보내기 위한 메서드
  @UseGuards(ChatValidationGuard)
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.QUESTION)
  handleQuestionMessage(client: Socket, payload: IncomingMessageDto) {
    const room = client.rooms.values().next().value;
    if(!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
    this.server.to(room).emit(CHATTING_SOCKET_RECEIVE_EVENT.QUESTION, payload);
  }

  // 방에 QUESTION DONE 메시지를 보내기 위한 메서드
  @UseGuards(ChatValidationGuard)
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.QUESTION_DONE)
  handleQuestionDoneMessage(client: Socket, payload: IncomingMessageDto) {
    const room = client.rooms.values().next().value;
    if(!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
    this.server.to(room).emit(CHATTING_SOCKET_RECEIVE_EVENT.QUESTION_DONE, payload);
  }

  // 방에 NORMAL 메시지를 보내기 위한 메서드
  @UseGuards(ChatValidationGuard)
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.NOTICE)
  handleNoticeMessage(client: Socket, payload: IncomingMessageDto) {
    const room = client.rooms.values().next().value;
    if(!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
    this.server.to(room).emit(CHATTING_SOCKET_RECEIVE_EVENT.NOTICE, payload);
  }
}
