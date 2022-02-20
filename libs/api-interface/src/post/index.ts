import client from '../axiosClient';
import { Post, PostWithDetail } from './post.interface';

export type PostResponse = Post;
export interface RecentPostParameter {
  page?: number;
  limit?: number;
}
export type GetUserSaveResponse = Array<{
  id: number;
  post: Post;
  savedAt: string;
}>;
export type RecentPostResponse = Post[];

export const getRecentPost = (params: RecentPostParameter) => {
  return client.request({
    url: '/posts/',
    params,
  }) as Promise<RecentPostResponse>;
};
export type PostWithDetailResponse = PostWithDetail;
export const getPostDetail = (id: number) => {
  return client.get(`/posts/${id}`) as Promise<PostWithDetail>;
};

export interface SearchPostParameter {
  page?: number;
  limit?: number;
  q: string;
}

export type SearchPostResponse = Post[];

export const searchPost = (data: SearchPostParameter) => {
  return client.request({
    url: '/posts/search',
    params: data,
  }) as Promise<SearchPostResponse>;
};
export const savePost = (postId: number) => {
  return client.post(`/posts/save/${postId}`) as Promise<{ message: string }>;
};
export const getSavePost = () => {
  return client.get('/posts/save') as Promise<GetUserSaveResponse>;
};
export const deleteSavePost = (postId: number) => {
  return client.delete(`/posts/save/${postId}`) as Promise<{ message: string }>;
};
