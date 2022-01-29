import client from '../axiosClient';
import { Post } from '../post/post.interface';

export interface PostByChannelParameter {
  topicId: number;
  page?: number;
  limit?: number;
}

export interface PostByChannelResponse {
  name: string;
  contents: Post[];
}

export const getPostByChannel = (data: PostByChannelParameter) => {
  const { topicId, ...params } = data;
  return client.request({
    url: `/channel/${topicId}/content`,
    params,
  }) as Promise<PostByChannelResponse>;
};

export type HomeTopicResponse = PostByChannelResponse[];

export const getHomeChannel = () => {
  return client.get('/channel/homepage') as Promise<HomeTopicResponse>;
};