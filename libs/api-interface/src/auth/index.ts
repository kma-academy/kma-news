import client from '../axiosClient';
import { UserWithoutPassword } from '../user/user.interface';

export interface LoginParameter {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expiredAt: string;
  user: UserWithoutPassword;
}

export const loginWithEmail = (data: LoginParameter) => {
  return client.request({
    method: 'POST',
    url: '/auth/login',
    withCredentials: true,
    data,
  }) as Promise<LoginResponse>;
};

export const loginWithZalo = (code: string) => {
  return client.request({
    url: '/auth/login/zalo',
    method: 'POST',
    withCredentials: true,
    data: {
      code,
    },
  }) as Promise<LoginResponse>;
};

export interface LogoutResponse {
  message: string;
}

export const logout = () => {
  return client.request({
    method: 'POST',
    url: '/auth/logout',
    withCredentials: true,
  }) as Promise<LogoutResponse>;
};
export type ProfileResponse = UserWithoutPassword;
export const getProfile = () => {
  return client.get('/auth/profile') as Promise<ProfileResponse>;
};

export interface RefreshTokenResponse {
  access_token: string;
  user: UserWithoutPassword;
}

export const refreshToken = () => {
  return client.request({
    method: 'POST',
    url: '/auth/refresh',
    withCredentials: true,
  }) as Promise<RefreshTokenResponse>;
};

export interface RegisterParameter {
  email: string;
  password: string;
  name?: string;
  avatarURL?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegisterResponse extends LoginResponse {}

export const register = (data: RegisterParameter) => {
  return client.request({
    method: 'POST',
    url: '/auth/register',
    withCredentials: true,
    data,
  }) as Promise<RegisterResponse>;
};
