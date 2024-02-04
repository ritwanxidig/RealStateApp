import { createSlice } from "@reduxjs/toolkit";

const analaysisSlice = {
  name: "analaysis",
  initialState: {
    analaysis: {},
  },
  reducers: {
    setAnalaysis: (state, action) => {
      state.analaysis = action.payload;
    },
  },
};

export const analaysis = createSlice(analaysisSlice);

export const { setAnalaysis } = analaysis.actions;

export default analaysis.reducer;
