import client from '../axiosClient';
import { Post } from '../post/post.interface';
export type GetUserHistoryResponse = Array<{
  id: number;
  post: Post;
  visitDate: string;
}>;
export const getUserHistory = () => {
  return client.get('/views') as Promise<GetUserHistoryResponse>;
};
