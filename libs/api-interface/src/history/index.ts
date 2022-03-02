import client from '../axiosClient';
import { Post } from '../post/post.interface';
import { PagenationParam } from '../react/index';
export type GetUserHistoryResponse = Array<{
  id: number;
  post: Post;
  visitDate: string;
}>;
export const getUserHistory = (param: PagenationParam) => {
  return client.request({
    url: '/views',
    params: param,
  }) as Promise<GetUserHistoryResponse>;
};

export const deleteHistory = (id: number) => {
  return client.delete(`/views/${id}`) as Promise<{ message: string }>;
};

export const updateViewPost = (postId: number) => {
  return client.post(`/views/${postId}`) as Promise<{ message: string }>;
};
