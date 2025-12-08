import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginThunk,
  refreshUserThunk,
  registerThunk,
  logoutThunk,
  editUserName,
} from "./operations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isAuthLoading: false,
  isAuthError: null,
  isRegistering: false,
  theme: "light",
};

const pendingMatcher = isAnyOf(
  loginThunk.pending,
  registerThunk.pending,
  refreshUserThunk.pending
);
const rejectedMatcher = isAnyOf(
  loginThunk.rejected,
  registerThunk.rejected,
  refreshUserThunk.rejected
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    themeToggle: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutThunk.fulfilled, () => {
        const theme = localStorage.getItem("theme") || "light";
        return { ...initialState, theme };
      })
      .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
        const { accessToken, user } = payload;
        if (accessToken) state.token = accessToken;
        if (user) state.user = user;
        state.isLoggedIn = Boolean(state.token);
        state.isRefreshing = false;
        state.isAuthError = null;
        state.isAuthLoading = false;
      })
      .addCase(refreshUserThunk.pending, (state) => {
        state.isRefreshing = true;
        state.isAuthLoading = true;
        state.isAuthError = null;
      })
      .addCase(refreshUserThunk.rejected, (state, { payload }) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.refreshToken = null;
        state.isAuthLoading = false;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.isAuthError = payload || "Failed to refresh";
      })
      .addMatcher(
        isAnyOf(registerThunk.fulfilled, loginThunk.fulfilled),
        (state, { payload }) => {
          const user = payload.user || {};
          state.user.name = payload.user.name ?? null;
          state.user.email = payload.user.email ?? null;
          state.token = payload.accessToken;
          state.refreshToken = payload.refreshToken;
          state.isLoggedIn = Boolean(payload.accessToken);
          state.isAuthLoading = false;
          state.isAuthError = null;
          state.isRegistering = false;
        }
      )
      .addMatcher(pendingMatcher, (state) => {
        state.isAuthLoading = true;
        state.isAuthError = null;
      })
      .addMatcher(rejectedMatcher, (state, { payload }) => {
        state.isAuthLoading = false;
        state.isAuthError = payload;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { themeToggle } = authSlice.actions;
