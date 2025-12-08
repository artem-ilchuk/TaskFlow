import { createSlice, nanoid } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    addProject: {
      reducer(state, { payload }) {
        state.push({ payload });
      },
      prepare(name, description) {
        return {
          payload: nanoid(),
          name,
          description,
        };
      },
    },
  },
  updateProject(state, { payload }) {
    const { id, name, description } = payload;
    const project = state.find((proj) => proj.id === id);
    if (project) {
      project.name = name;
      project.description = description;
    }
  },
  deleteProject(state, { payload }) {
    return state.filter((proj) => proj.id !== payload);
  },
});

export const projectsReducer = projectsSlice.reducer;
export const { addProject, updateProject, deleteProject } =
  projectsSlice.actions;
