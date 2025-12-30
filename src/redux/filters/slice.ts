import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Ops from "../../types/operations";

interface FilterState {
  projectSearch: string;
  taskFilters: Ops.ITaskFilters;
}

const initialState: FilterState = {
  projectSearch: "",
  taskFilters: {
    search: "",
    priority: "all",
    status: "all",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setProjectSearch: (state, { payload }: PayloadAction<string>) => {
      state.projectSearch = payload;
    },
    setTaskFilters: (
      state,
      { payload }: PayloadAction<Partial<Ops.ITaskFilters>>
    ) => {
      state.taskFilters = { ...state.taskFilters, ...payload };
    },
    resetTaskFilters: (state) => {
      state.taskFilters = initialState.taskFilters;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { setProjectSearch, setTaskFilters, resetTaskFilters } =
  filterSlice.actions;
