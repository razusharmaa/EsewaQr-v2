
// src/features/theme/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  try {
    return savedTheme ? JSON.parse(savedTheme) : false;
  } catch (e) {
    // If there's an error parsing the theme, default to false (light mode)
    return false;
  }
};

const initialState = {
  darkMode: getInitialTheme(),
};


export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('theme', JSON.stringify(state.darkMode));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
