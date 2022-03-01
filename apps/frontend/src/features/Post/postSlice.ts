import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getPostDetail, increaseViewPost, PostWithDetailResponse } from '@kma-news/api-interface';

interface ReadingPageState {
  data?: PostWithDetailResponse;
  loading: 'idle' | 'pending' | 'done' | 'error';
  message?: string;
}
const initialState: ReadingPageState = {
  data: undefined,
  loading: 'idle',
};
export const getPostAction = createAsyncThunk(
  'post/fetchOne',
   (id: number) => {
    //increase view of current post
    increaseViewPost(id);
    return getPostDetail(id);
  }
);

const postSlice = createSlice({
  name: 'new',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getPostAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.data = action.payload;
      })
      .addCase(getPostAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});
export const selectData = (state: RootState) => state.post.data;
export const selectLoading = (state: RootState) => state.post.loading;
export const selectError = (state: RootState) => state.post.message;

export default postSlice.reducer;
