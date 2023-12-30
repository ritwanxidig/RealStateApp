import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    open: false,
    type: "error",
    message: "",
  },
  reducers: {
    setAlert: (state, action) => {
      state.open = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    closeAlert: (state) => {
      state.open = false;
      state.type = "error";
      state.message = "";
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
