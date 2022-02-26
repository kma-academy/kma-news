import { Post } from '../post/post.interface';

export interface ReactPost {
  id: number;
  post: Post[];
  userId: number;
  visitDate: Date;
  deleteAt: Date;
}
