import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  CommentByPostResponse,
  LoadingState,
  getCommentByPost,
  CreateCommentParameter,
  createComment,
} from '@kma-news/api-interface';

export interface CommentState {
  comments: CommentByPostResponse;
  loading: LoadingState;
  message?: string;
}

export const getCommentByPostAction = createAsyncThunk(
  'comment/fetch',
  (postId: number) => {
    return getCommentByPost(postId);
  }
);

export const createCommentAction = createAsyncThunk(
  'comment/create',
  (data: CreateCommentParameter) => {
    return createComment(data);
  }
);

const initialState: CommentState = {
  loading: 'idle',
  comments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentByPostAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getCommentByPostAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.comments = action.payload;
      })
      .addCase(getCommentByPostAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
    builder
      .addCase(createCommentAction.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createCommentAction.fulfilled, (state, action) => {
        state.loading = 'done';
        state.comments.unshift(action.payload);
      })
      .addCase(createCommentAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});
type RootState = {
  comment: CommentState;
};
export const selectComment = <T extends RootState>(state: T) =>
  state.comment.comments;
export const selectLoading = <T extends RootState>(state: T) =>
  state.comment.loading;
export const selectMessage = <T extends RootState>(state: T) =>
  state.comment.message;

export default commentSlice.reducer;
