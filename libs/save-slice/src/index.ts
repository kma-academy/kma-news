import {
  savePost,
  getSavePost,
  deleteSavePost,
  getAllSavePost,
  GetUserSaveResponse,
  LoadingState,
} from '@kma-news/api-interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const savePostAction = createAsyncThunk(
  'post/save/fetch',
  (id: number) => {
    return savePost(id);
  }
);

export const deleteSavePostAction = createAsyncThunk(
  'post/save/delete',
  (id: number) => {
    return deleteSavePost(id);
  }
);

export const getSavePostAction = createAsyncThunk(
  'post/save/fetchOne',
  (id: number) => {
    return getSavePost(id);
  }
);
export const getAllSavePostAction = createAsyncThunk('post/save/fetch', () => {
  return getAllSavePost();
});
export interface SavePostState {
  loading: LoadingState;
  savePosts: GetUserSaveResponse;
  isSave: boolean;
}

const initialState: SavePostState = {
  loading: 'idle',
  savePosts: [],
  isSave: false,
};

const saveSlice = createSlice({
  name: 'save',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSavePostAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getAllSavePostAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.savePosts = action.payload;
      })
      .addCase(getAllSavePostAction.rejected, (state) => {
        state.loading = 'error';
      });
    builder
      .addCase(deleteSavePostAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(deleteSavePostAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.savePosts = state.savePosts.filter(
          (e) => e.id !== action.meta.arg
        );
      })
      .addCase(deleteSavePostAction.rejected, (state) => {
        state.loading = 'error';
      });
    builder
      .addCase(savePostAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(savePostAction.fulfilled, (state) => {
        state.loading = 'done';
      })
      .addCase(savePostAction.rejected, (state) => {
        state.loading = 'error';
      });
    builder
      .addCase(getSavePostAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getSavePostAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.isSave = action.payload.isSave;
      })
      .addCase(getSavePostAction.rejected, (state) => {
        state.loading = 'error';
      });
  },
});

type RootState = {
  savePost: SavePostState;
};
export const selectAllSave = <T extends RootState>(state: T) =>
  state.savePost.savePosts;
export const selectLoading = <T extends RootState>(state: T) =>
  state.savePost.loading;
export const selectSave = <T extends RootState>(state: T) =>
  state.savePost.isSave;
export default saveSlice.reducer;
