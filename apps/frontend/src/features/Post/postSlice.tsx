import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { getOnePost, Types } from 'shared-api'

interface ReadingPageState {
  data?: Types.APIResponse.GetOnePost
  loading: 'idle' | 'pending' | 'done' | 'error'
  message?: string
}
const initialState: ReadingPageState = {
  data: undefined,
  loading: 'idle',
}
export const getPostAction = createAsyncThunk('post/fetchOne', async (arg: string, ThunkApi) => {
  const data = await getOnePost(arg)
  return data
})

const postSlice = createSlice({
  name: 'new',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getPostAction.fulfilled, (state, action) => {
        state.loading = 'done'
        state.data = action.payload
      })
      .addCase(getPostAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })
  },
})
export const selectData = (state: RootState) => state.post.data
export const selectLoading = (state: RootState) => state.post.loading
export const selectError = (state: RootState) => state.post.message

export default postSlice.reducer
