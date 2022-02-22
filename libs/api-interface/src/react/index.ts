import client from '../axiosClient';
import { ReactPost } from './react-inteface';

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
