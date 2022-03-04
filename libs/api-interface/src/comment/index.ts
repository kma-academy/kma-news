import client from '../axiosClient';
import { Comment } from './comment.interface';

export type CommentByPostResponse = Comment[];

export const getCommentByPost = (postId: number) => {
  return client.get(
    `/posts/${postId}/comments`
  ) as Promise<CommentByPostResponse>;
};

export interface CreateCommentParameter {
  postId: number;
  message: string;
}
export interface DeleteCommentParameter {
  postId?: number;
  id: number;
}
export const createComment = (data: CreateCommentParameter) => {
  const { postId, message } = data;
  return client.post(`/posts/${postId}/comments`, {
    message,
  }) as Promise<Comment>;
};
export const deleteComment = (data: DeleteCommentParameter) => {
  const { postId, id } = data;
  return client.delete(`/posts/${postId}/comments/${id}`) as Promise<{
    message: string;
  }>;
};
