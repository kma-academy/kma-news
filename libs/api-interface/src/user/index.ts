import { RegisterParameter } from '../auth';
import client from '../axiosClient';

import { CreateUser, UserWithoutPassword } from './user.interface';

export type GetAllUserResponse = Array<UserWithoutPassword>;

export const getAllUsers = () => {
  return client.get('/users/') as Promise<GetAllUserResponse>;
};
export const createUser = (user: RegisterParameter) => {
  return client.request({
    method: 'post',
    url: '/users/',
    // withCredentials: true,
    data: user,
  }) as Promise<{ message: string }>;
};
export const deleteUser = (id: number) => {
  return client.delete(`/users/${id}`) as Promise<{ message: string }>;
};
export type User = UserWithoutPassword;
