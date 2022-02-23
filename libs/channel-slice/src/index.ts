import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  PersonalChannelResponse,
  getPersonalChannel,
  LoadingState,
  createPersonalChannel,
  CreatePersonalChannelParameter,
  searchCategory,
  SearchCategoryResponse,
  deletePersonalChannel,
} from '@kma-news/api-interface';

export const getPersonalChannelAction = createAsyncThunk('channel/get', () => {
  return getPersonalChannel();
});

export const searchCategoryAction = createAsyncThunk(
  'channel/search_category',
  (q: string) => {
    return searchCategory(q);
  }
);

export const createPersonalChannelAction = createAsyncThunk(
  'channel/create',
  (data: CreatePersonalChannelParameter) => {
    return createPersonalChannel(data);
  }
);

export const deletePersonalChannelAction = createAsyncThunk(
  'channel/delete',
  (id: number) => {
    return deletePersonalChannel(id);
  }
);

export interface ChannelState {
  channels: PersonalChannelResponse;
  categories: SearchCategoryResponse;
  loading: LoadingState;
  message?: string;
  redirectSuccess: boolean;
}
const initialState: ChannelState = {
  channels: [],
  loading: 'idle',
  categories: [],
  redirectSuccess: false,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPersonalChannelAction.pending, (state) => {
        state.loading = 'pending';
        state.redirectSuccess = false;
      })
      .addCase(getPersonalChannelAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.channels = action.payload;
      })
      .addCase(getPersonalChannelAction.rejected, (state) => {
        state.loading = 'error';
      });
    builder
      .addCase(createPersonalChannelAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createPersonalChannelAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.redirectSuccess = true;
        state.channels.push(action.payload);
      })
      .addCase(createPersonalChannelAction.rejected, (state) => {
        state.loading = 'error';
      });
    builder.addCase(searchCategoryAction.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder
      .addCase(deletePersonalChannelAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(deletePersonalChannelAction.fulfilled, (state, action) => {
        state.loading = 'done';
      })
      .addCase(deletePersonalChannelAction.rejected, (state) => {
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
export const selectMessage = <T extends RootState>(state: T) =>
  state.channel.message;
export const selectCategory = <T extends RootState>(state: T) =>
  state.channel.categories;
export const selectRedirectSuccess = <T extends RootState>(state: T) =>
  state.channel.redirectSuccess;

export default channelSlice.reducer;
