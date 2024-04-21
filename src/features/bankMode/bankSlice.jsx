// bankSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  SelectedBank: localStorage.getItem("SelectedBank") || "",
  decodedCode: localStorage.getItem("decodedCode") || "",
};

// Create the slice
const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    setBank: (state, action) => {
      if (action.payload.SelectedBank !== undefined) {
        state.SelectedBank = action.payload.SelectedBank;
        localStorage.setItem("SelectedBank", action.payload.SelectedBank);
      }
      if (action.payload.decodedCode !== undefined) {
        state.decodedCode = action.payload.decodedCode;
        localStorage.setItem("decodedCode", action.payload.decodedCode);
      }
    },
    clearField: (state, action) => {
      state[action.payload] = "";
      localStorage.removeItem(action.payload);
    },
  },
});

// Export the actions
export const { setBank, clearField } = bankSlice.actions;

// Export the reducer
export default bankSlice.reducer;
