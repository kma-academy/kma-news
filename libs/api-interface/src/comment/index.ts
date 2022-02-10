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

export const createComment = (data: CreateCommentParameter) => {
  const { postId, message } = data;
  return client.post(`/posts/${postId}/comments`, {
    message,
  }) as Promise<Comment>;
};
