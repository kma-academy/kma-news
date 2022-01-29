import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import {
  Covid19Response,
  fetchCovid19General,
  LoadingState,
} from '@kma-news/api-interface';

interface Covid19State {
  data?: Covid19Response;
  loading: LoadingState;
  error?: string;
}

const initialState: Covid19State = {
  loading: 'idle',
};

export const fetchCovid19Data = createAsyncThunk('covid19/fetch', async () => {
  const data = await fetchCovid19General();
  return data;
});

export const covid19Slice = createSlice({
  name: 'covid19',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCovid19Data.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCovid19Data.fulfilled, (state, payload) => {
        state.data = payload.payload;
        state.loading = 'done';
      })
      .addCase(fetchCovid19Data.rejected, (state, payload) => {
        state.loading = 'error';
        state.error = payload.error.message;
      });
  },
});
export const selectData = (state: RootState) => state.covid19.data;
export const selectLoading = (state: RootState) => state.covid19.loading;
export const selectError = (state: RootState) => state.covid19.error;

export default covid19Slice.reducer;
