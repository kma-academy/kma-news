import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RootState } from '@/app/store';
import {
  getRecentPost,
  RecentPostResponse,
  RecentPostParameter,
  TopPostResponse,
  TopPostParameter,
  getTopPost,
} from '@kma-news/api-interface';
import { LoadingState } from '@kma-news/api-interface';

interface HomeState {
  data: RecentPostResponse;
  topPosts: TopPostResponse;
  loading: LoadingState;
  message?: string;
}

const initialState: HomeState = {
  data: [],
  loading: 'idle',
  topPosts: [],
};

export const fetchNewFeedAction = createAsyncThunk(
  'home/newFeed',
  (params: RecentPostParameter, ThunkApi) => {
    return getRecentPost(params);
  }
);

export const fetchTopPostAction = createAsyncThunk(
  'home/top_feed',
  (data: TopPostParameter) => {
    return getTopPost(data);
  }
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewFeedAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchNewFeedAction.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = 'done';
      })
      .addCase(fetchNewFeedAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
    builder.addCase(fetchTopPostAction.fulfilled, (state, action) => {
      state.topPosts = action.payload;
    });
  },
});
export const selectData = (state: RootState) => state.home.data;
export const selectLoading = (state: RootState) => state.home.loading;
export const selectError = (state: RootState) => state.home.message;
export const selectTopPost = (state: RootState) => state.home.topPosts;

export default homeSlice.reducer;
