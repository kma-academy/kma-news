import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOptionByName } from '@kma-news/api-interface';
import { RootState } from '@/app/store';
import { CategoryGroupProps } from '../Category/components/CategoryGroup';

export const getHeaderMenusAction = createAsyncThunk('option/menu', () => {
  return getOptionByName<HeaderMenuOption[]>('header.menu');
});

export const getHeaderTagsAction = createAsyncThunk('option/tag', () => {
  return getOptionByName<HeaderMenuOption[]>('header.tag');
});

export const getHeaderCategoriesAction = createAsyncThunk(
  'option/category',
  () => {
    return getOptionByName<CategoryGroupProps[]>('header.category');
  }
);

interface HeaderMenuOption {
  name: string;
  path: string;
}

interface OptionState {
  headerMenus: HeaderMenuOption[];
  headerTags: HeaderMenuOption[];
  headerCategories: CategoryGroupProps[];
}

const initialState: OptionState = {
  headerMenus: [],
  headerTags: [],
  headerCategories: [],
};

const optionSlice = createSlice({
  name: 'option',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getHeaderMenusAction.fulfilled, (state, action) => {
      state.headerMenus = action.payload.value;
    });
    builder.addCase(getHeaderTagsAction.fulfilled, (state, action) => {
      state.headerTags = action.payload.value;
    });
    builder.addCase(getHeaderCategoriesAction.fulfilled, (state, action) => {
      state.headerCategories = action.payload.value;
    });
  },
});
export const selectHeaderMenu = (state: RootState) => state.option.headerMenus;
export const selectHeaderTag = (state: RootState) => state.option.headerTags;
export const selectHeaderCategory = (state: RootState) =>
  state.option.headerCategories;

export default optionSlice.reducer;
