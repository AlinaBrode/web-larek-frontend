import { loginUserApi, TRegisterData } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface TUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser;
  loginUserError: string | null;
  loginUserRequest: boolean;
}

const initialState: TUserState = {
  isAuthChecked: false, // флаг для статуса проверки токена пользователя
  isAuthenticated: false,
  data: { email: '', name: '' },
  loginUserError: null,
  loginUserRequest: false
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) =>
    await loginUserApi({ email, password })
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
        console.log('user penging');
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
        console.log('user rejected', action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        console.log('user fulfilled', action.payload);
      });
  }
});

export default userSlice.reducer;
