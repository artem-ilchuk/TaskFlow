// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

// export const taskFlowAPI = axios.create({
//   baseURL: "http://server.onrender.com/",
//   withCredentials: true,
// });

// export const setAuthHeader = (token) => {
//   taskFlowAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
// };
// export const resetAuthHeader = () => {
//   taskFlowAPI.defaults.headers.common.Authorization = "";
// };

// export const registerThunk = createAsyncThunk(
//   "user/register",
//   async (credentials, thunkAPI) => {
//     try {
//       const { data } = await taskFlowAPI.post("/auth/register", credentials);
//       setAuthHeader(data.accessToken);
//       toast.success("Registration successful! Welcome aboard.");
//       return data;
//     } catch (error) {
//       if (error.response?.status === 409) {
//         toast.error("User with the same email already exists.");
//       } else {
//         toast.error("Ooops... Registration failed. Please try again.");
//       }
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const loginThunk = createAsyncThunk(
//   "user/login",
//   async (credentials, thunkAPI) => {
//     try {
//       const { data } = await taskFlowAPI.post("/auth/login", credentials);
//       setAuthHeader(data.accessToken);
//       toast.success("Where were you? I missed you! Login successful!");
//       return data;
//     } catch (error) {
//       toast.error("Ooops...Login failed. Please check your credentials.");
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
// export const logoutThunk = createAsyncThunk(
//   "user/logout",
//   async (_, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState();
//       const lastPath = state.router?.pathname || window.location.pathname;
//       localStorage.setItem("lastVisitedPage", lastPath);
//       await taskFlowAPI.post("/auth/logout");
//       resetAuthHeader();
//       toast.success("Hope to see you soon! Logout successful!");
//     } catch (error) {
//       toast.error("Ooops...Logout failed. You are still with us!");
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
// export const refreshUserThunk = createAsyncThunk(
//   "user/refresh",
//   async (_, thunkAPI) => {
//     const savedToken = thunkAPI.getState().auth.token;
//     if (!savedToken) {
//       return thunkAPI.rejectWithValue("Ooops...Token does not exist");
//     }
//     setAuthHeader(savedToken);
//     try {
//       const { data } = await taskFlowAPI.get("/users/current");
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const editUserName = createAsyncThunk(
//   "user/editName",
//   async ({ name }, thunkAPI) => {
//     try {
//       const { data } = await taskFlowAPI.patch("/users/current", { name });
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";

/* Типы */

interface User {
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface RefreshResponse {
  accessToken: string;
  user: User;
}

/* ================= REGISTER ================= */

export const registerThunk = createAsyncThunk<
  AuthResponse, // возвращаемый тип
  { name: string; email: string; password: string }, // аргументы
  { rejectValue: string }
>("auth/register", async ({ name, email, password }, thunkAPI) => {
  try {
    // ⏳ имитация запроса
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      user: {
        name,
        email,
      },
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    };
  } catch (error) {
    return thunkAPI.rejectWithValue("Register failed");
  }
});

/* ================= LOGIN ================= */

export const loginThunk = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 400));

    return {
      user: {
        name: "Test User",
        email,
      },
      accessToken: "login-access-token",
      refreshToken: "login-refresh-token",
    };
  } catch (error) {
    return thunkAPI.rejectWithValue("Login failed");
  }
});

/* ================= REFRESH USER ================= */

export const refreshUserThunk = createAsyncThunk<
  RefreshResponse,
  void,
  { rejectValue: string }
>("auth/refresh", async (_, thunkAPI) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      accessToken: "refreshed-access-token",
      user: {
        name: "Test User",
        email: "test@mail.com",
      },
    };
  } catch (error) {
    return thunkAPI.rejectWithValue("Refresh failed");
  }
});

/* ================= LOGOUT ================= */

export const logoutThunk = createAsyncThunk<void>("auth/logout", async () => {
  return;
});

/* ================= EDIT USER NAME ================= */

export const editUserName = createAsyncThunk<
  { name: string },
  string,
  { rejectValue: string }
>("auth/editUserName", async (newName, thunkAPI) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return { name: newName };
  } catch (error) {
    return thunkAPI.rejectWithValue("Edit name failed");
  }
});
