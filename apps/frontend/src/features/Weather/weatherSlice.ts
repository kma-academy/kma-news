import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { RootState } from '@/app/store';
import {
  WeatherResponse,
  fetchWeatherGeneral,
  LoadingState,
} from '@kma-news/api-interface';
import { fetchNewFeedAction } from '../HomePage/homeSlice';

interface weatherState {
  data: WeatherResponse;
  loading: LoadingState;
  error?: string;
}

const initialState: weatherState = {
  loading: 'idle',
  data: [],
};

export const fetchWeatherAction = createAsyncThunk(
  'weather/fetch',
  async (loaction: string) => {
    const data = await fetchWeatherGeneral(loaction);
    return data;
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchWeatherAction.fulfilled, (state, payload) => {
        state.data = payload.payload;
        state.loading = 'done';
      })
      .addCase(fetchNewFeedAction.rejected, (state, payload) => {
        state.loading = 'error';
        state.error = payload.error.message;
      });
  },
});
type RootState = {
  weather: weatherState;
};
export const selectData = (state: RootState) => state.weather.data;
export const selectLoading = (state: RootState) => state.weather.loading;
export const selectError = (state: RootState) => state.weather.error;

export default weatherSlice.reducer;
