import {
  createReactPost,
  getListReact,
  getReactByPost,
  ReactPostResponse,
} from '../../api-interface/src/react';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadingState } from '@kma-news/api-interface';
export const createReatPostAction = createAsyncThunk(
  'reactPost/add',
  (postId: number) => {
    return createReactPost(postId);
  }
);

export const getReactPostAction = createAsyncThunk(
  'reactPost/fetch',
  (postId: number) => {
    return getReactByPost(postId);
  }
);

export const getListReactPostAction = createAsyncThunk('reactPost/get', () => {
  return getListReact();
});

export interface ReactPostState {
  loading: LoadingState;
  reacts: ReactPostResponse;
  isActive: boolean;
}

const initialState: ReactPostState = {
  loading: 'idle',
  reacts: [],
  isActive: false,
};

const reactPostSlice = createSlice({
  name: 'react post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReatPostAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createReatPostAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.reacts = action.payload;
      })
      .addCase(createReatPostAction.rejected, (state) => {
        state.loading = 'error';
      });
    builder
      .addCase(getReactPostAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getReactPostAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.isActive = action.payload.isActive;
      })
      .addCase(getReactPostAction.rejected, (state) => {
        state.loading = 'error';
      });
    builder
      .addCase(getListReactPostAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getListReactPostAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.reacts = action.payload;
      })
      .addCase(getListReactPostAction.rejected, (state) => {
        state.loading = 'error';
      });
  },
});

type RootState = {
  reactPost: ReactPostState;
};
export const selectReact = <T extends RootState>(state: T) =>
  state.reactPost.reacts;
export const selectLoading = <T extends RootState>(state: T) =>
  state.reactPost.loading;
export const selectActiveReact = <T extends RootState>(state: T) =>
  state.reactPost.isActive;

export const selectListReact = <T extends RootState>(state: T) =>
  state.reactPost.reacts;

export default reactPostSlice.reducer;
