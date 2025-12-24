export interface User {
  id: string | null;
  name: string | null;
  email: string | null;
}

export interface IUser {
  id: string;
  _id: string;
  name: string;
  email: string;
  avatar: string | null;
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
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  user: User;
  accessToken: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface EditNamePayload {
  name: string;
}
