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

export const deleteHistory = (id: number) => {
  return client.delete(`/views/${id}`) as Promise<{ message: string }>;
};

export const updateViewPost = (postId: number) => {
  return client.post(`/views/${postId}`) as Promise<{ message: string }>;
};
