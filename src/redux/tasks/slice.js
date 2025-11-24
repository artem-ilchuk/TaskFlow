import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchTasks,
  addTask,
  deleteTask,
  editTask,
  logoutThunk,
} from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(addTask.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(editTask.fulfilled, (state, { payload }) => {
        state.items = state.items.map((task) =>
          task.id === payload.id ? payload : task
        );
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((task) => task.id !== payload);
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.items = [];
        state.isLoading = false;
        state.isError = null;
      })
      .addMatcher(
        isAnyOf(
          fetchTasks.pending,
          addTask.pending,
          deleteTask.pending,
          editTask.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchTasks.rejected,
          addTask.rejected,
          deleteTask.rejected,
          editTask.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.isError = payload;
        }
      );
  },
});

export const tasksReducer = tasksSlice.reducer;
