import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    authenticatedUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.authenticatedUser = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.authenticatedUser = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
