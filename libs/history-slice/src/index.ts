import {
  deleteHistory,
  getUserHistory,
  GetUserHistoryResponse,
  LoadingState,
  updateViewPost,
} from '@kma-news/api-interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUserHistoryAction = createAsyncThunk('history/fetch', () => {
  return getUserHistory();
});

export const deleteHistoryAction = createAsyncThunk(
  'history/delete',
  (id: number) => {
    return deleteHistory(id);
  }
);

export const updateViewPostAction = createAsyncThunk(
  'history/add',
  (postId: number) => {
    return updateViewPost(postId);
  }
);

export interface HistoryState {
  loading: LoadingState;
  histories: GetUserHistoryResponse;
}

const initialState: HistoryState = {
  loading: 'idle',
  histories: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserHistoryAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getUserHistoryAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.histories = action.payload;
      })
      .addCase(getUserHistoryAction.rejected, (state) => {
        state.loading = 'error';
      });
    builder
      .addCase(deleteHistoryAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(deleteHistoryAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.histories = state.histories.filter(
          (e) => e.id !== action.meta.arg
        );
      })
      .addCase(deleteHistoryAction.rejected, (state) => {
        state.loading = 'error';
      });
  },
});

type RootState = {
  history: HistoryState;
};
export const selectHistory = <T extends RootState>(state: T) =>
  state.history.histories;
export const selectLoading = <T extends RootState>(state: T) =>
  state.history.loading;

export default historySlice.reducer;
