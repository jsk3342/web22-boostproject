import { Module } from '@nestjs/common';
import { ChatGateway, ChatValidationGuard } from './chat.gateway';
import { UserModule } from '../user/user.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [UserModule, QuestionModule],
  providers: [ChatGateway, ChatValidationGuard],
})
export class ChatModule {}
