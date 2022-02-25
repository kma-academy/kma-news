import { Category } from './category.interface';
import client from '../axiosClient';
import { Post } from '../post/post.interface';
export type ListCategory = Category[];

export const getListCategory = () => {
  return client.get('/categories') as Promise<ListCategory>;
};

export const getPostsByCategory = (id: number) => {
  return client.get(`/categories/${id}`) as Promise<[Post]>;
};

export type SearchCategoryResponse = Category[];

export const searchCategory = (q: string) => {
  return client.request({
    url: 'categories/search',
    params: {
      q,
    },
  }) as Promise<SearchCategoryResponse>;
};
export type CategoryType = Category;
