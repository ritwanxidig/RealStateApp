import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",

  initialState: {
    theme: "dark",
    darkMode: true,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleDarkMode: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      state.theme === "dark"
        ? (state.darkMode = true)
        : (state.darkMode = false); 
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
