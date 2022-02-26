import client from '../axiosClient';

import { CreateUser, UserWithoutPassword } from './user.interface';

export type GetAllUserResponse = Array<UserWithoutPassword>;

export const getAllUsers = () => {
  return client.get('/users/') as Promise<GetAllUserResponse>;
};
export const createUser = (user: CreateUser) => {
  return client.post('/user/') as Promise<{ message: string }>;
};
export type User = UserWithoutPassword;
