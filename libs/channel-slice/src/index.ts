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
  updatePersonalChannel,
  getChannelById,
} from '@kma-news/api-interface';

import { Channel } from '../../api-interface/src/channel/channel.interface';
import { channel } from 'diagnostics_channel';
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

export const updatePersonalChannelAction = createAsyncThunk(
  'channel/update',
  async ({
    id,
    data,
  }: {
    id: number;
    data: CreatePersonalChannelParameter;
  }) => {
    return updatePersonalChannel(id, data);
  }
);

export const deletePersonalChannelAction = createAsyncThunk(
  'channel/delete',
  (id: number) => {
    return deletePersonalChannel(id);
  }
);

export const getChannelByIdAction = createAsyncThunk(
  'channel/getData',
  (id: number) => {
    return getChannelById(id);
  }
);

export interface ChannelState {
  channels: PersonalChannelResponse;
  categories: SearchCategoryResponse;
  channleData: Channel[];
  loading: LoadingState;
  message?: string;
  redirectSuccess: boolean;
}
const initialState: ChannelState = {
  channels: [],
  loading: 'idle',
  categories: [],
  redirectSuccess: false,
  channleData: [],
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
      .addCase(updatePersonalChannelAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updatePersonalChannelAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.redirectSuccess = true;
        state.channels = action.payload.data;
      })
      .addCase(updatePersonalChannelAction.rejected, (state) => {
        state.loading = 'error';
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
    builder
      .addCase(getChannelByIdAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getChannelByIdAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.channleData[0] = action.payload;
      })
      .addCase(getChannelByIdAction.rejected, (state) => {
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

export const selectDataChannel = <T extends RootState>(state: T) =>
  state.channel.channleData;

export default channelSlice.reducer;
