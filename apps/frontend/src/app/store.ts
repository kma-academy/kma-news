import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import covid19Slice from '@/features/covid19/covid19Slice';
import authSlice from '@/features/Auth/authSlice';
import postSlice from '@/features/Post/postSlice';
import categorySlice from '@/features/Category/categorySlice';
import homeSlice from '@/features/HomePage/homeSlice';
import optionSlice from '@/features/Option/optionSlice';
import topicSlice from '@/features/Topic/topicSlice';

console.log(process.env['REACT_APP_API_URL']);

export const store = configureStore({
  reducer: {
    covid19: covid19Slice,
    auth: authSlice,
    post: postSlice,
    category: categorySlice,
    home: homeSlice,
    option: optionSlice,
    topic: topicSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
