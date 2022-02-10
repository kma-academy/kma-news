import { User } from '../user/user.interface';

export interface Comment {
  id: number;
  author: Pick<User, 'id' | 'name' | 'email' | 'avatarURL'>;
  createAt: string;
  updateAt: string;
  content: string;
}
