import { createSlice } from "@reduxjs/toolkit";

const toolSlice = createSlice({
  name: "tool",
  initialState: {
    selectedTool: "draw",
    color: "transparent",
    selectedId: null,
  },
  reducers: {
    setTool: (state, action) => {
      state.selectedTool = action.payload;
      state.selectedId = null;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const { setTool, setColor, setSelectedId } = toolSlice.actions;
export default toolSlice.reducer;
