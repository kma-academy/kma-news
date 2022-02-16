import axios from 'axios';
import qs from 'qs';
import { RefreshTokenResponse, refreshToken } from './auth';
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8888',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => qs.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const access_token = localStorage.getItem('access_token');
  if (access_token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${access_token}`,
    };
  }
  return config;
});

const getCookieExpiredDate = () => {
  try {
    const dateStr = localStorage.getItem('expiredAt');
    if (!dateStr) return new Date();
    return new Date(dateStr);
  } catch (error) {
    return new Date();
  }
};

export const ignorePath = ['/auth/login', '/auth/logout'];
let refreshTokenRequest: Promise<RefreshTokenResponse> | null = null;
axiosClient.interceptors.response.use(
  (response) => {
    if (response?.data) return response.data;
    return response;
  },
  (error) => {
    // Token hết hạn
    if (error?.response?.status === 401) {
      console.log('Token expired');
      const cookieExpiredDate = getCookieExpiredDate();
      // Cookie hết hạn
      if (
        Math.abs(cookieExpiredDate.getTime() - new Date().getTime()) <
        10 * 1000
      ) {
        console.log('Session expired');
        throw error;
      } else if (ignorePath.includes(window.location.pathname)) {
        console.log('Skip refresh token');
        throw error;
      } else {
        console.log('Refresh token');
        refreshTokenRequest = refreshTokenRequest || refreshToken();
        return refreshTokenRequest
          .then((data) => {
            console.log('Refresh token success');
            localStorage.setItem('access_token', data.access_token);
            refreshTokenRequest = null;
            return axiosClient.request(error.config);
          })
          .catch((error) => {
            if (error?.response?.status !== 500) {
              console.log('Refresh token failed');
              localStorage.removeItem('access_token');
            }
            refreshTokenRequest = null;
            throw error;
          });
      }
    }
    const status = error?.response?.status && `[${error.response.status}] `;
    if (error?.response?.data?.message) {
      return Promise.reject(status + error.response.data.message);
    }
    if (error?.response?.data?.error?.message) {
      return Promise.reject(status + error.response.data.error.message);
    }
    if (error?.response?.data?.error?.errors) {
      return Promise.reject(status + error.response.data.error.errors);
    }
    if (error?.response?.data?.error) {
      return Promise.reject(status + error.response.data.error);
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
