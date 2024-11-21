import { Question } from '../event/dto/OutgoingMessage.dto';
import { User } from './user.interface';

interface Room {
  hostId: string;
  questions: Question[];
  users: Map<string, User>;
}

export { Room };
