// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const loginThunk = createAsyncThunk(
//   "auth/login",
//   async (_, thunkAPI) => {
//     return {
//       user: { name: "Test User", email: "test@example.com" },
//       accessToken: "token123",
//       refreshToken: "refreshToken123",
//     };
//   }
// );

// export const registerThunk = createAsyncThunk(
//   "auth/register",
//   async (_, thunkAPI) => {
//     return {
//       user: { name: "New User", email: "new@example.com" },
//       accessToken: "token123",
//       refreshToken: "refreshToken123",
//     };
//   }
// );

// export const refreshUserThunk = createAsyncThunk(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     return {
//       user: { name: "Refreshed User", email: "refresh@example.com" },
//       accessToken: "token123",
//       refreshToken: "refreshToken123",
//     };
//   }
// );

// export const logoutThunk = createAsyncThunk("auth/logout", async () => {
//   return;
// });

import { createAsyncThunk } from "@reduxjs/toolkit";

// Логин (тест без авторизации)
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (_, thunkAPI) => {
    return {
      user: { name: null, email: null },
      accessToken: null,
      refreshToken: null,
    };
  }
);

// Регистрация (тест без авторизации)
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (_, thunkAPI) => {
    return {
      user: { name: null, email: null },
      accessToken: null,
      refreshToken: null,
    };
  }
);

// Обновление сессии (refresh) без авторизации
export const refreshUserThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    return {
      user: { name: null, email: null },
      accessToken: null,
      refreshToken: null,
    };
  }
);

// Выход (logout) – всё очищаем
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    return;
  }
);
