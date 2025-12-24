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
      .addCase(refreshUserThunk.pending, (state) => {
        state.isRefreshing = true;
        state.isAuthLoading = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, { payload }: any) => {
        const userData = payload?.data || payload;
        if (userData && (userData._id || userData.id)) {
          state.user = {
            id: userData._id || userData.id,
            name: userData.name,
            email: userData.email,
          };
          state.token = payload?.accessToken || state.token;
          state.isLoggedIn = true;
        }
        state.isRefreshing = false;
        state.isAuthLoading = false;
      })
      .addCase(refreshUserThunk.rejected, (state) => {
        state.user = { id: null, name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.isAuthLoading = false;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(registerThunk.fulfilled, loginThunk.fulfilled),
        (state, action: any) => {
          const responseData = action.payload?.data || action.payload;
          const user = responseData?.user || responseData;
          if (user) {
            state.user = {
              id: user._id || user.id,
              name: user.name,
              email: user.email,
            };
            state.token = responseData.accessToken;
            state.isLoggedIn = true;
          }
          state.isAuthLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(registerThunk.rejected, loginThunk.rejected),
        (state, { payload }) => {
          state.isAuthLoading = false;
          state.isAuthError = typeof payload === "string" ? payload : "Error";
        }
      );
  },
});

export const authReducer = authSlice.reducer;
