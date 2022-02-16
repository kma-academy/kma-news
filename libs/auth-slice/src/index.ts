import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  LoadingState,
  logout,
  loginWithEmail,
  getProfile,
  LoginParameter,
  ProfileResponse,
} from '@kma-news/api-interface';

export const loginAction = createAsyncThunk(
  'auth/login',
  async (_: LoginParameter) => {
    const result = await loginWithEmail(_);
    return result;
  }
);
export const profileAction = createAsyncThunk(
  'auth/profile',
  async (_, thunkAPI) => {
    const rootState = thunkAPI.getState() as RootState;
    if (!selectLoggedIn(rootState)) {
      throw new Error('Not logged in');
    }
    const data = await getProfile();
    return data;
  }
);

export const logoutAction = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    const rootState = thunkAPI.getState() as RootState;
    if (!selectLoggedIn(rootState)) {
      return {
        message: 'You are not logged in',
      };
    }
    const data = await logout();
    return data;
  }
);

export const loginZaloAction = createAsyncThunk(
  'auth/login_zalo',
  async (code: string) => {
    const result = await loginWithEmail({ email: code, password: '' });
    return result;
  }
);

export interface AuthState {
  loading: LoadingState;
  loggedIn: boolean;
  profile?: ProfileResponse;
  message?: string;
}
const initialState: AuthState = {
  loading: 'idle',
  loggedIn: !!localStorage.getItem('access_token'),
};
const authSlice = createSlice({
  name: 'auth',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    const allLoginAction = [loginAction, loginZaloAction] as const;
    allLoginAction.forEach((act) => {
      builder
        .addCase(act.pending, (state) => {
          state.loading = 'pending';
        })
        .addCase(act.fulfilled, (state, action) => {
          state.loading = 'done';
          state.loggedIn = true;
          const { access_token, expiredAt, user } = action.payload;
          state.profile = user;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('expiredAt', expiredAt);
        })
        .addCase(act.rejected, (state, action) => {
          state.loading = 'error';
          state.message = action.error.message;
        });
    });

    builder
      .addCase(profileAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(profileAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.profile = action.payload;
      })
      .addCase(profileAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
    builder
      .addCase(logoutAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.message = 'Logout success';
        state.loggedIn = false;
        state.profile = undefined;
        localStorage.removeItem('access_token');
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.loading = 'error';
        state.loggedIn = false;
        state.profile = undefined;
        localStorage.removeItem('access_token');
      });
  },
});
interface RootState {
  auth: AuthState;
}

export const selectLoading = <T extends RootState>(state: T) =>
  state.auth.loading;
export const selectLoggedIn = <T extends RootState>(state: T) =>
  state.auth.loggedIn;
export const selectProfile = <T extends RootState>(state: T) =>
  state.auth.profile;
export const selectMessage = <T extends RootState>(state: T) =>
  state.auth.message;

export default authSlice.reducer;
