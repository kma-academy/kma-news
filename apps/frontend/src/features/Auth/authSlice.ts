import { loginWithEmail, loginWithZalo, getProfile, Types, logout } from 'shared-api'
import { RootState } from '@/app/store'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LoadingState } from 'shared-types'

export const loginAction = createAsyncThunk(
  'auth/login',
  async (_: Types.APIParameter.Login, thunkAPI) => {
    const result = await loginWithEmail(_)
    return result
  }
)
export const profileAction = createAsyncThunk('auth/profile', async (_, thunkAPI) => {
  const rootState = thunkAPI.getState() as RootState
  if (!selectLoggedIn(rootState)) {
    throw new Error('Not logged in')
  }
  const data = await getProfile()
  return data
})

export const logoutAction = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  const rootState = thunkAPI.getState() as RootState
  if (!selectLoggedIn(rootState)) {
    return {
      message: 'You are not logged in',
    }
  }
  const data = await logout()
  return data
})

export const loginZaloAction = createAsyncThunk('auth/login_zalo', async (_: string, thunkAPI) => {
  const result = await loginWithZalo(_)
  return result
})

export interface AuthState {
  loading: LoadingState
  loggedIn: boolean
  profile?: Types.APIResponse.Profile
  message?: string
}
const initialState: AuthState = {
  loading: 'idle',
  loggedIn: !!localStorage.getItem('access_token'),
}
const authSlice = createSlice({
  name: 'auth',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    const allLoginAction = [loginAction, loginZaloAction] as const
    allLoginAction.forEach((act) => {
      builder
        .addCase(act.pending, (state) => {
          state.loading = 'pending'
        })
        .addCase(act.fulfilled, (state, action) => {
          state.loading = 'done'
          state.loggedIn = true
          const { access_token, user } = action.payload
          state.profile = user
          localStorage.setItem('access_token', access_token)
        })
        .addCase(act.rejected, (state, action) => {
          state.loading = 'error'
          state.message = action.error.message
        })
    })

    builder
      .addCase(profileAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(profileAction.fulfilled, (state, action) => {
        state.loading = 'done'
        state.profile = action.payload
      })
      .addCase(profileAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })
    builder
      .addCase(logoutAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.loading = 'done'
        state.message = 'Logout success'
        state.loggedIn = false
        state.profile = undefined
        localStorage.removeItem('access_token')
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.loading = 'error'
        state.loggedIn = false
        state.profile = undefined
        localStorage.removeItem('access_token')
      })
  },
})

export const selectLoading = (state: RootState) => state.auth.loading
export const selectLoggedIn = (state: RootState) => state.auth.loggedIn
export const selectProfile = (state: RootState) => state.auth.profile
export const selectMessage = (state: RootState) => state.auth.message

export default authSlice.reducer
