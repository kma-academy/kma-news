import client from '../axiosClient';
import { Post, PostWithDetail } from './post.interface';

export type PostResponse = Post;
export interface RecentPostParameter {
  page?: number;
  limit?: number;
}

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
