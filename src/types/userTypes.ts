export interface User {
  name: string | null;
  email: string | null;
}

export type AuthPayload = {
  user: { name: string | null; email: string | null };
  accessToken: string;
  refreshToken: string;
};

export interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isAuthLoading: boolean;
  isAuthError: string | null;
  isRegistering: boolean;
  refreshToken: string | null;
  theme: "light" | "dark";
}
