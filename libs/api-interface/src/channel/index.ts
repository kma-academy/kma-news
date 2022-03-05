import { CategoryType } from '..';
import client from '../axiosClient';
import { Post } from '../post/post.interface';
import { Channel } from './channel.interface';

export interface PostByChannelParameter {
  topicId: number;
  page?: number;
  limit?: number;
}

export interface PostByChannelResponse {
  id: number;
  name: string;
  url: string;
  contents: Post[];
}

export const getPostByChannel = (data: PostByChannelParameter) => {
  const { topicId, ...params } = data;
  return client.request({
    url: `/channels/${topicId}/content`,
    params,
  }) as Promise<PostByChannelResponse>;
};

export type HomeTopicResponse = PostByChannelResponse[];

export const getHomeChannel = () => {
  return client.get('/channels/homepage') as Promise<HomeTopicResponse>;
};

export type PersonalChannelResponse = Omit<PostByChannelResponse, 'contents'>[];

export const getPersonalChannel = () => {
  return client.get('/channels/mychannel') as Promise<PersonalChannelResponse>;
};

export const deletePersonalChannel = (id: number) => {
  return client.delete(`/channels/${id}`);
};

export const updatePersonalChannel = (
  id: number,
  data: CreatePersonalChannelParameter
) => {
  return client.patch(`/channels/${id}`, data);
};

export const getChannelById = (id: number) => {
  return client.get(`/channels/${id}`) as Promise<Channel>;
};

export type CreatePersonalChannelReponse = Omit<
  PostByChannelResponse,
  'contents'
>;
export interface CreatePersonalChannelParameter {
  name: string;
  keywords: string[];
  excludedKeywords: string[];
  categories: CategoryType[];
  excludedCategories: CategoryType[];
  publishers: string[];
  excludedPublishers: string[];
}

export const createPersonalChannel = (data: CreatePersonalChannelParameter) => {
  return client.post(
    '/channels/mychannel',
    data
  ) as Promise<CreatePersonalChannelReponse>;
};
