import client from '../axiosClient';

import { UserWithoutPassword } from './user.interface';

export type GetAllUserResponse = Array<UserWithoutPassword>;

export const getAllUsers = () => {
  return client.get('/users/') as Promise<GetAllUserResponse>;
};

export type User = UserWithoutPassword;
