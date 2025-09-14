import { configureStore } from "@reduxjs/toolkit";
import toolReducer from "@/features/toolSlice";
import drawingReducer from "@/features/drawingSlice";

export default configureStore({
  reducer: {
    tool: toolReducer,
    drawing: drawingReducer,
  },
});
