export type UserRole = 'admin' | 'writter' | 'user';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatarURL?: string;
  role: UserRole;
}

export type UserWithoutPassword = Omit<User, 'password'>;
export type CreateUser = Partial<User>;
