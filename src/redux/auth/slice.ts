import { createSlice, PayloadAction, isAnyOf } from "@reduxjs/toolkit";
import {
  loginThunk,
  refreshUserThunk,
  registerThunk,
  logoutThunk,
} from "./operations";
import { AuthState, AuthResponse } from "../../types/userTypes";

const initialState: AuthState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isAuthLoading: false,
  isAuthError: null,
  isRegistering: false,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isRegistering = true;
      })
      .addCase(refreshUserThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
        if (payload.accessToken) {
          state.token = payload.accessToken;
        }
        state.user = payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isAuthLoading = false;
      })
      .addCase(refreshUserThunk.rejected, (state) => {
        state.isRefreshing = false;
        state.isAuthLoading = false;
        state.token = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(registerThunk.fulfilled, loginThunk.fulfilled),
        (state, action: PayloadAction<AuthResponse>) => {
          const { user, accessToken, refreshToken } = action.payload;
          state.user = user;
          state.token = accessToken;
          state.refreshToken = refreshToken;
          state.isLoggedIn = true;
          state.isAuthLoading = false;
          state.isRegistering = false;
          state.isAuthError = null;
        }
      )
      .addMatcher(
        isAnyOf(registerThunk.rejected, loginThunk.rejected),
        (state, { payload }) => {
          state.isAuthLoading = false;
          state.isRegistering = false;
          state.isAuthError =
            typeof payload === "string" ? payload : "Auth error";
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          refreshUserThunk.pending
        ),
        (state) => {
          state.isAuthLoading = true;
          state.isAuthError = null;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
