import {
  savePost,
  getSavePost,
  deleteSavePost,
  getAllSavePost,
  GetUserSaveResponse,
  LoadingState,
} from '@kma-news/api-interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const savePostAction = createAsyncThunk('post/save', (id: number) => {
  return savePost(id);
});

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
  idSave?: number;
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
        state.isSave = false;
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
        state.isSave = !state.isSave;
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
        if (action.payload.idSave) state.idSave = action.payload.idSave;
        if (action.payload.isSave == true) state.isSave = true;
        else state.isSave = false;
      })
      .addCase(getSavePostAction.rejected, (state) => {
        state.loading = 'error';
      });
  },
});

interface RootState {
  save: SavePostState;
}
export const selectAllSave = <T extends RootState>(state: T) =>
  state.save.savePosts;
export const selectLoading = <T extends RootState>(state: T) =>
  state.save.loading;
export const selectIdSave = <T extends RootState>(state: T) =>
  state.save.idSave;
export const selectSave = <T extends RootState>(state: T) => state.save.isSave;
export default saveSlice.reducer;
