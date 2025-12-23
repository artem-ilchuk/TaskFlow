import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginThunk,
  refreshUserThunk,
  registerThunk,
  logoutThunk,
} from "./operations";
import { AuthState } from "../../types/userTypes";

const initialState: AuthState = {
  user: { id: null, name: null, email: null },
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
        state.isAuthLoading = true;
        state.isLoggedIn = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, { payload }: any) => {
        const userData = payload?.data?.user || payload?.user;

        if (userData) {
          state.user = {
            id: userData._id || userData.id,
            name: userData.name,
            email: userData.email,
          };
          state.token =
            payload?.data?.accessToken || payload?.accessToken || state.token;
          state.isLoggedIn = true;
        }

        state.isRefreshing = false;
        state.isAuthLoading = false;
      })
      .addCase(refreshUserThunk.rejected, (state) => {
        state.isRefreshing = false;
        state.isAuthLoading = false;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(registerThunk.fulfilled, loginThunk.fulfilled),
        (state, action: any) => {
          const responseData = action.payload?.data || action.payload;

          if (responseData?.user) {
            state.user = {
              id: responseData.user._id || responseData.user.id,
              name: responseData.user.name,
              email: responseData.user.email,
            };
            state.token = responseData.accessToken;
            state.refreshToken = responseData.refreshToken;
            state.isLoggedIn = true;
          }

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
