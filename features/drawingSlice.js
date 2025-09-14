import { createSlice } from "@reduxjs/toolkit";

const drawingSlice = createSlice({
  name: "drawing",
  initialState: {
    shapes: [],
  },
  reducers: {
    addShape: (state, action) => {
      state.shapes.push(action.payload);
    },
    updateLastShape: (state, action) => {
      const { id, props } = action.payload;
      const index = state.shapes.findIndex((s) => s.id === id);
      if (index !== -1) {
        state.shapes[index] = {
          ...state.shapes[index],
          ...props,
        };
      }
    },
    setShapes: (state, action) => {
      state.shapes = action.payload;
    },
  },
});

export const { addShape, updateLastShape, setShapes } = drawingSlice.actions;
export default drawingSlice.reducer;
