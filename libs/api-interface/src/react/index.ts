import client from '../axiosClient';
import { ReactPost } from './react-inteface';
export interface PagenationParam {
  page?: number;
  limit?: number;
}
export interface getActiveReact {
  isActive: boolean;
}

export type ReactPostResponse = ReactPost[];
export const createReactPost = (postId: number) => {
  return client.post(`/react-post/${postId}`) as Promise<ReactPostResponse>;
};

export const getReactByPost = (postId: number) => {
  return client.get(`/react-post/${postId}`) as Promise<getActiveReact>;
};

export const getListReact = (param: PagenationParam) => {
  return client.request({ url: '/react-post', params: param }) as Promise<
    ReactPost[]
  >;
};
