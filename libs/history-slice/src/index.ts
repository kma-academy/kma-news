import {
  getUserHistory,
  GetUserHistoryResponse,
  LoadingState,
} from '@kma-news/api-interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUserHistoryAction = createAsyncThunk('history/fetch', () => {
  return getUserHistory();
});

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
      .addCase(getUserHistoryAction.rejected, (state, action) => {
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
