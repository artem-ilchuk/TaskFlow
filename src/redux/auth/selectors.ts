import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectIsAuthLoading = (state: RootState) =>
  state.auth.isAuthLoading;
export const selectIsAuthError = (state: RootState) => state.auth.isAuthError;
export const selectIsRegistering = (state: RootState) =>
  state.auth.isRegistering;
