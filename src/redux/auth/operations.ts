import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import type { RootState } from "../store";
import {
  AuthResponse,
  EditNamePayload,
  LoginCredentials,
  RefreshResponse,
  RegisterCredentials,
  User,
} from "../../types/userTypes";

export const taskFlowAPI = axios.create({
  baseURL: "https://server-task-flow-kpu2.onrender.com",
  withCredentials: true,
});

export const setAuthHeader = (token: string): void => {
  taskFlowAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const resetAuthHeader = (): void => {
  taskFlowAPI.defaults.headers.common.Authorization = "";
};

taskFlowAPI.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !(originalRequest as any)._retry
    ) {
      (originalRequest as any)._retry = true;

      try {
        const { data } = await axios.get<RefreshResponse>(
          "https://server-task-flow-kpu2.onrender.com/users/current",
          { withCredentials: true }
        );

        setAuthHeader(data.accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }

        return taskFlowAPI(originalRequest);
      } catch (refreshError) {
        resetAuthHeader();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const registerThunk = createAsyncThunk<
  AuthResponse,
  RegisterCredentials,
  { rejectValue: string }
>("user/register", async (credentials, thunkAPI) => {
  try {
    const { data } = await taskFlowAPI.post<AuthResponse>(
      "/auth/register",
      credentials
    );
    setAuthHeader(data.accessToken);
    toast.success("Registration successful! Welcome aboard.");
    return data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    if (error.response?.status === 409) {
      toast.error("User with the same email already exists.");
    } else {
      toast.error("Ooops... Registration failed.");
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const loginThunk = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>("user/login", async (credentials, thunkAPI) => {
  try {
    const { data } = await taskFlowAPI.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    setAuthHeader(data.accessToken);
    toast.success("Welcome back!");
    return data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    toast.error("Login failed. Please check your credentials.");
    return thunkAPI.rejectWithValue(message);
  }
});

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("user/logout", async (_, thunkAPI) => {
  try {
    await taskFlowAPI.post("/auth/logout");
    resetAuthHeader();
    toast.success("Logout successful!");
  } catch (error: any) {
    resetAuthHeader();
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUserThunk = createAsyncThunk<
  RefreshResponse,
  void,
  { state: RootState; rejectValue: string }
>("user/refresh", async (_, thunkAPI) => {
  const savedToken = thunkAPI.getState().auth.token;

  if (!savedToken) {
    return thunkAPI.rejectWithValue("No token found");
  }

  setAuthHeader(savedToken);

  try {
    const { data } = await taskFlowAPI.get<RefreshResponse>("/users/current");
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editUserName = createAsyncThunk<
  User,
  EditNamePayload,
  { rejectValue: string }
>("user/editName", async ({ name }, thunkAPI) => {
  try {
    const { data } = await taskFlowAPI.patch<User>("/users/current", { name });
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
