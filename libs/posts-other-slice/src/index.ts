import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getRecentPost,
  RecentPostParameter,
  LoadingState,
  RecentPostResponse,
} from '@kma-news/api-interface';

export interface PostState {
  posts: RecentPostResponse;
  loading: LoadingState;
  message?: string;
}

export const getPostsOtherAction = createAsyncThunk(
  'postsOther/fetch',
  (param: RecentPostParameter) => {
    return getRecentPost(param);
  }
);
const initialState: PostState = {
  loading: 'idle',
  posts: [],
};

const postOtherSlice = createSlice({
  name: 'post other',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostsOtherAction.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getPostsOtherAction.fulfilled, (state, action) => {
      state.loading = 'done';
      state.posts = action.payload;
    });
    builder.addCase(getPostsOtherAction.rejected, (state, action) => {
      state.loading = 'error';
      state.message = action.error.message;
    });
  },
});

type RootState = {
  postOther: PostState;
};

export const selectPostOther = <T extends RootState>(state: T) =>
  state.postOther.posts;
export const selectLoading = <T extends RootState>(state: T) =>
  state.postOther.loading;
export const selectMessage = <T extends RootState>(state: T) =>
  state.postOther.message;

export default postOtherSlice.reducer;
