import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "" };

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (state, { payload }) => {
      state.name = payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { changeFilter } = filterSlice.actions;
