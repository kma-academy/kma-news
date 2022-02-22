import client from '../axiosClient';
import { Post } from '../post/post.interface';
export type GetUserSaveResponse = Array<{
  id: number;
  post: Post;
  savedAt: string;
}>;
export type getCheckSaveResponse = {
  isSave: boolean;
  idSave?: number;
};
export const savePost = (postId: number) => {
  return client.post(`/posts/${postId}/save`) as Promise<{ message: string }>;
};
export const getAllSavePost = () => {
  return client.get('/posts/save') as Promise<GetUserSaveResponse>;
};
export const getSavePost = (postId: number) => {
  return client.get(`/posts/${postId}/save`) as Promise<getCheckSaveResponse>;
};
export const deleteSavePost = (postId: number) => {
  return client.delete(`/posts/${postId}/save`) as Promise<{ message: string }>;
};
