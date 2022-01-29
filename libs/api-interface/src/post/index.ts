import client from '../axiosClient';
import { Post, PostWithDetail } from './post.interface';

export interface RecentPostParameter {
  page?: number;
  limit?: number;
}

export type RecentPostResponse = Post[];

export const getRecentPost = (params: RecentPostParameter) => {
  return client.request({
    url: '/posts/',
    params,
  }) as Promise<RecentPostParameter>;
};

export const getPostDetail = (id: number) => {
  return client.get(`/posts/${id}`) as Promise<PostWithDetail>;
};
