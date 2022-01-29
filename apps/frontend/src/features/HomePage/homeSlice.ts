import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { getAllPosts, Types } from 'shared-api'

interface HomeState {
  data: Types.APIResponse.GetAllPosts
  loading: 'idle' | 'pending' | 'done' | 'error'
  message?: string
}

const initialState: HomeState = {
  data: [],
  loading: 'idle',
}

export const fetchNewFeedAction = createAsyncThunk(
  'home/newFeed',
  async (params: Types.APIParameter.GetAllPosts, ThunkApi) => {
    const data = await getAllPosts(params)
    return data
  }
)

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewFeedAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchNewFeedAction.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = 'done'
      })
      .addCase(fetchNewFeedAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })
  },
})
export const selectData = (state: RootState) => state.home.data
export const selectLoading = (state: RootState) => state.home.loading
export const selectError = (state: RootState) => state.home.message

export default homeSlice.reducer
