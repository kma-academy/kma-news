/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  LoadingState,
  logout,
  loginWithEmail,
  getProfile,
  LoginParameter,
  ProfileResponse,
  loginWithZalo,
  RegisterParameter,
  register,
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
    const result = await loginWithZalo(code);
    return result;
  }
);

export const registerAction = createAsyncThunk(
  'auth/register',
  (data: RegisterParameter) => {
    return register(data);
  }
);
export interface AuthState {
  loading: LoadingState;
  loggedIn: boolean;
  profile?: ProfileResponse;
  message?: string;
  showLoginPopup: boolean;
}
const initialState: AuthState = {
  loading: 'idle',
  loggedIn: !!localStorage.getItem('access_token'),
  showLoginPopup: false,
};
const authSlice = createSlice({
  name: 'auth',
  reducers: {
    togglePopup: (state, action: PayloadAction<boolean>) => {
      state.showLoginPopup = action.payload;
    },
  },
  initialState,
  extraReducers: (builder) => {
    const allLoginAction = [
      loginAction,
      loginZaloAction,
      registerAction,
    ] as const;
    allLoginAction.forEach((act) => {
      builder
        .addCase(act.pending, (state) => {
          state.loading = 'pending';
          state.message = '';
        })
        .addCase(act.fulfilled, (state, action) => {
          state.loading = 'done';
          state.loggedIn = true;
          state.showLoginPopup = false;
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
        localStorage.removeItem('expiredAt');
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.loading = 'error';
        state.loggedIn = false;
        state.profile = undefined;
        localStorage.removeItem('access_token');
        localStorage.removeItem('expiredAt');
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
export const selectShowPopup = <T extends RootState>(state: T) =>
  state.auth.showLoginPopup;

export const { togglePopup } = authSlice.actions;

export default authSlice.reducer;
