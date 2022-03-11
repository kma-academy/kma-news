/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllUsers,
  LoadingState,
  deleteUser,
  RegisterParameter,
  createUser,
} from '@kma-news/api-interface';
import { UserWithoutPassword } from 'libs/api-interface/src/user/user.interface';
export const getAllUserAction = createAsyncThunk('fetch/user', () => {
  return getAllUsers();
});
export const deleteUserAction = createAsyncThunk(
  'delete/user',
  (id: number) => {
    return deleteUser(id);
  }
);
export const createUserAction = createAsyncThunk(
  'create/user',
  (user: RegisterParameter) => {
    return createUser(user);
  }
);
export interface UserState {
  loading: LoadingState;
  users: UserWithoutPassword[];
  message?: string;
}
const initialState: UserState = {
  loading: 'idle',
  users: [],
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getAllUserAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.users = action.payload;
        state.message = '';
      })
      .addCase(getAllUserAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
    builder
      .addCase(createUserAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createUserAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.message = '';
      })
      .addCase(createUserAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });

    builder
      .addCase(deleteUserAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.message = '';
      })
      .addCase(deleteUserAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});
type RootState = {
  user: UserState;
};
export const selectUser = <T extends RootState>(state: T) => state.user.users;
export const selectLoading = <T extends RootState>(state: T) =>
  state.user.loading;
export const selectMessage = <T extends RootState>(state: T) =>
  state.user.message;

export default userSlice.reducer;
