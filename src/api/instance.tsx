import axios from "axios";
import { store } from "../redux/store";

const api = axios.create({
  baseURL: "https://server-task-flow-kpu2.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
