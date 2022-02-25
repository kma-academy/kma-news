import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  LoadingState,
  ListCategory,
  searchCategory,
  getPostsByCategory,
} from '@kma-news/api-interface';
import { RootState } from '@/app/store';
import { Category } from 'libs/api-interface/src/category/category.interface';
import { Post } from 'libs/api-interface/src/post/post.interface';

export const getTreeAction = createAsyncThunk(
  'category/getTree',
  async (_, thunkAPI) => {
    return Promise.resolve([]);
  }
);

export const searchCategoryAction = createAsyncThunk(
  'category/search',
  (q: string) => {
    return searchCategory(q);
  }
);

export const getPostsByCategoryAction = createAsyncThunk(
  'category/post',
  (id: number) => {
    return getPostsByCategory(id);
  }
);

interface CategoryState {
  data: Category[];
  loading: LoadingState;
  message?: string;
  post: Post[];
}

const initialState: CategoryState = {
  data: [],
  loading: 'idle',
  post: [],
};
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTreeAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getTreeAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.data = action.payload;
      })
      .addCase(getTreeAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
    builder
      .addCase(getPostsByCategoryAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getPostsByCategoryAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.post = action.payload;
      })
      .addCase(getPostsByCategoryAction.rejected, (state) => {
        state.loading = 'error';
      });
    builder
      .addCase(searchCategoryAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(searchCategoryAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.data = action.payload;
      })
      .addCase(searchCategoryAction.rejected, (state) => {
        state.loading = 'error';
      });
  },
});

export const selectData = (state: RootState) => state.category.data;
export const selectLoading = (state: RootState) => state.category.loading;
export const selectMessage = (state: RootState) => state.category.message;
export const selectPostByCategory = (state: RootState) => state.category.post;
export default categorySlice.reducer;
