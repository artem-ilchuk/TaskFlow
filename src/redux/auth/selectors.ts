import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectAuth = (state: RootState) => state.auth;

export const selectUser = createSelector([selectAuth], (auth) => auth.user);
export const selectUserId = createSelector([selectUser], (user) => user?.id);
export const selectIsLoggedIn = createSelector(
  [selectAuth],
  (auth) => auth.isLoggedIn
);
export const selectIsRefreshing = createSelector(
  [selectAuth],
  (auth) => auth.isRefreshing
);

export const selectIsAuthLoading = createSelector(
  [selectAuth],
  (auth) => auth.isAuthLoading
);
export const selectIsAuthError = createSelector(
  [selectAuth],
  (auth) => auth.isAuthError
);
export const selectIsRegistering = createSelector(
  [selectAuth],
  (auth) => auth.isRegistering
);

export const selectAuthStatus = createSelector(
  [selectIsLoggedIn, selectIsRefreshing, selectIsAuthLoading],
  (isLoggedIn, isRefreshing, isLoading) => ({
    isLoggedIn,
    isRefreshing,
    isLoading,
    shouldShowLoader: isRefreshing || isLoading,
  })
);
