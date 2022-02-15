import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  PersonalChannelResponse,
  getPersonalChannel,
  LoadingState,
} from '@kma-news/api-interface';

export const getPersonalChannelAction = createAsyncThunk(
  'channel/mychannel',
  () => {
    return getPersonalChannel();
  }
);

export interface ChannelState {
  channels: PersonalChannelResponse;
  loading: LoadingState;
}
const initialState: ChannelState = {
  channels: [],
  loading: 'idle',
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPersonalChannelAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getPersonalChannelAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.channels = action.payload;
      })
      .addCase(getPersonalChannelAction.rejected, (state) => {
        state.loading = 'error';
      });
  },
});

interface RootState {
  channel: ChannelState;
}

export const selectChannel = <T extends RootState>(state: T) =>
  state.channel.channels;
export const selectLoading = <T extends RootState>(state: T) =>
  state.channel.loading;

export default channelSlice.reducer;
