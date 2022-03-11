import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  LoadingState,
  getPostByChannel,
  getHomeChannel,
  PostByChannelParameter,
  PostByChannelResponse,
  HomeTopicResponse,
} from '@kma-news/api-interface';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RootState } from '@/app/store';

export const getPostsOnTopicAction = createAsyncThunk(
  'topic/getPostsOnTopic',
  (_: PostByChannelParameter) => {
    return getPostByChannel(_);
  }
);
export const getHomeTopicsAction = createAsyncThunk('topic/homeTopic', () => {
  return getHomeChannel();
});

interface TopicState {
  topicContents?: PostByChannelResponse;
  loading: LoadingState;
  message?: string;
  topics: HomeTopicResponse;
}
const initialState: TopicState = {
  loading: 'idle',
  topics: [],
};

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsOnTopicAction.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(getPostsOnTopicAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.topicContents = action.payload;
      })
      .addCase(getPostsOnTopicAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
    builder
      .addCase(getHomeTopicsAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getHomeTopicsAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.topics = action.payload;
      })
      .addCase(getHomeTopicsAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});

export const selectTopicContents = (state: RootState) =>
  state.topic.topicContents;
export const selectLoading = (state: RootState) => state.topic.loading;
export const selectMessage = (state: RootState) => state.topic.message;
export const selectHomeTopics = (state: RootState) => state.topic.topics;

export default topicSlice.reducer;
