import { loginUserApi, TRegisterData } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) =>
    await loginUserApi({ email, password })
);

interface TUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
}

const initialState: TUserState = {
  isAuthChecked: false, // флаг для статуса проверки токена пользователя
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError =
          typeof action.payload === 'string'
            ? action.payload
            : typeof action.error.message === 'string'
              ? action.error.message
              : 'An unknown error occurred';
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      });
  }
});

export default userSlice.reducer;
