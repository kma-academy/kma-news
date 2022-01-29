import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoadingState } from 'shared-types'
import { getOptionByName, updateOption, Types } from 'shared-api'
import { RootState } from '@/app/store'
import { CategoryGroupProps } from '../Category/components/CategoryGroup'

export const getOptionAction = createAsyncThunk('options/get', (name: string) => {
  return getOptionByName(name)
})

export const updateOptionAction = createAsyncThunk(
  '/option/update',
  (option: Types.APIParameter.UpdateOption) => {
    return updateOption(option)
  }
)

interface HeaderMenuOption {
  name: string
  path: string
}

interface OptionState {
  loading: LoadingState
  headerMenus: HeaderMenuOption[]
  headerTags: HeaderMenuOption[]
  headerCategories: CategoryGroupProps[]
  message: string
}

const initialState: OptionState = {
  loading: 'idle',
  headerMenus: [],
  headerTags: [],
  headerCategories: [],
  message: '',
}

const tryParse = <T>(json: string, defaultValue: T): T => {
  try {
    return JSON.parse(json) as T
  } catch (e) {
    return defaultValue
  }
}

const optionSlice = createSlice({
  name: 'option',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOptionAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getOptionAction.fulfilled, (state, action) => {
        state.loading = 'done'
        switch (action.payload.name) {
          case 'header.menu': {
            state.headerMenus = tryParse<HeaderMenuOption[]>(action.payload.value, [])
            break
          }
          case 'header.tag': {
            state.headerTags = tryParse<HeaderMenuOption[]>(action.payload.value, [])
            break
          }
          case 'header.category': {
            state.headerCategories = tryParse<CategoryGroupProps[]>(action.payload.value, [])
            break
          }
        }
      })
      .addCase(getOptionAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message || 'Something went wrong'
      })
  },
})

export const selectLoading = (state: RootState) => state.option.loading
export const selectMessage = (state: RootState) => state.option.message
export const selectHeaderMenu = (state: RootState) => state.option.headerMenus
export const selectHeaderTag = (state: RootState) => state.option.headerTags
export const selectHeaderCategory = (state: RootState) => state.option.headerCategories

export default optionSlice.reducer
