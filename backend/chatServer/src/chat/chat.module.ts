import { Module } from '@nestjs/common';
import { ChatGateway, checkHostUser, checkValidUser } from './chat.gateway';
import { UserModule } from '../user/user.module';
import { RoomService } from '../room/room.service';

@Module({
  imports: [UserModule],
  providers: [ChatGateway, checkValidUser, checkHostUser, RoomService],
})
export class ChatModule {}
