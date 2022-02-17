import {
  LoadingState,
  searchPost,
  SearchPostParameter,
  SearchPostResponse,
} from '@kma-news/api-interface';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface SearchState {
  loading: LoadingState;
  posts: SearchPostResponse;
}

export const searchPostAction = createAsyncThunk(
  'post/search',
  (data: SearchPostParameter) => {
    return searchPost(data);
  }
);

const initialState: SearchState = {
  loading: 'idle',
  posts: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchPostAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(searchPostAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.posts = action.payload;
      })
      .addCase(searchPostAction.rejected, (state) => {
        state.loading = 'error';
      });
  },
});
interface RootState {
  search: SearchState;
}

export const selectLoading = <T extends RootState>(state: T) =>
  state.search.loading;
export const selectSearchResult = <T extends RootState>(state: T) =>
  state.search.posts;

export default searchSlice.reducer;
