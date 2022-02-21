import client from '../axiosClient';
import { ReactPost } from './react-inteface';
export type ReactPostResponse = ReactPost[];
export const createReactPost = (postId: number) => {
  return client.post(`/react-post/${postId}`) as Promise<ReactPostResponse>;
};
