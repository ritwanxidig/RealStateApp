import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    authenticatedUser: null
  },
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.authenticatedUser = action.payload;
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.authenticatedUser = null;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
