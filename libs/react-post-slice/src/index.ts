import {
  createReactPost,
  ReactPostResponse,
} from '../../api-interface/src/react';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadingState } from '@kma-news/api-interface';
export const createReatPostAction = createAsyncThunk(
  'reactPost/fetch',
  (postId: number) => {
    return createReactPost(postId);
  }
);
export interface ReactPostState {
  loading: LoadingState;
  reacts: ReactPostResponse;
}

const initialState: ReactPostState = {
  loading: 'idle',
  reacts: [],
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
  },
});

type RootState = {
  reactPost: ReactPostState;
};
export const selectHistory = <T extends RootState>(state: T) =>
  state.reactPost.reacts;
export const selectLoading = <T extends RootState>(state: T) =>
  state.reactPost.loading;

export default reactPostSlice.reducer;
