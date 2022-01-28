import { Category } from './category.interface';
import client from '../axiosClient';

export type ListCategory = Category[];

export const getListCategory = () => {
  return client.get('/categories') as Promise<ListCategory>;
};
