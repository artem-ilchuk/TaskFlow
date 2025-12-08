import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const taskFlowAPI = axios.create({
  baseURL: "http://server.onrender.com/",
  withCredentials: true,
});

export const setAuthHeader = (token) => {
  taskFlowAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const resetAuthHeader = () => {
  taskFlowAPI.defaults.headers.common.Authorization = "";
};

export const registerThunk = createAsyncThunk(
  "user/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await taskFlowAPI.post("/auth/register", credentials);
      setAuthHeader(data.accessToken);
      toast.success("Registration successful! Welcome aboard.");
      return data;
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("User with the same email already exists.");
      } else {
        toast.error("Ooops... Registration failed. Please try again.");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await taskFlowAPI.post("/auth/login", credentials);
      setAuthHeader(data.accessToken);
      toast.success("Where were you? I missed you! Login successful!");
      return data;
    } catch (error) {
      toast.error("Ooops...Login failed. Please check your credentials.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logoutThunk = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const lastPath = state.router?.pathname || window.location.pathname;
      localStorage.setItem("lastVisitedPage", lastPath);
      await taskFlowAPI.post("/auth/logout");
      resetAuthHeader();
      toast.success("Hope to see you soon! Logout successful!");
    } catch (error) {
      toast.error("Ooops...Logout failed. You are still with us!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const refreshUserThunk = createAsyncThunk(
  "user/refresh",
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;
    if (!savedToken) {
      return thunkAPI.rejectWithValue("Ooops...Token does not exist");
    }
    setAuthHeader(savedToken);
    try {
      const { data } = await taskFlowAPI.get("/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editUserName = createAsyncThunk(
  "user/editName",
  async ({ name }, thunkAPI) => {
    try {
      const { data } = await taskFlowAPI.patch("/users/current", { name });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
