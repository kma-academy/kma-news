import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LoadingState } from 'shared-types'
import { Types, getTreeCategories } from 'shared-api'
import { RootState } from '@/app/store'

export const getTreeAction = createAsyncThunk('category/getTree', async (_, thunkAPI) => {
  return getTreeCategories()
})

interface CategoryState {
  data: Types.APIResponse.GetTreeCategories
  loading: LoadingState
  message?: string
}

const initialState: CategoryState = {
  data: [],
  loading: 'idle',
}
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTreeAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getTreeAction.fulfilled, (state, action) => {
        state.loading = 'done'
        state.data = action.payload
      })
      .addCase(getTreeAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })
  },
})

export const selectData = (state: RootState) => state.category.data
export const selectLoading = (state: RootState) => state.category.loading
export const selectMessage = (state: RootState) => state.category.message

export default categorySlice.reducer
