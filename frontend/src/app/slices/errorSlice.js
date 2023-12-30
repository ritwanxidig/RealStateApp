import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    isError: false,
    error: null,
  },
  reducers: {
    setError(state, action) {
      state.isError = !state.isError;
      state.error = action.payload;
    },
  },
});

export const errorActions = errorSlice.actions;
export default errorSlice.reducer;
