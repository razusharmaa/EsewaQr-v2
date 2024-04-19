import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  SelectedBank: localStorage.getItem('SelectedBank') || '',
  decodedCode: localStorage.getItem('decodedCode') || '',
};

// Create the slice
const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    setBank: (state, action) => {
      state.SelectedBank = action.payload.SelectedBank;
      state.decodedCode = action.payload.decodedCode;
      // Save to localStorage
      localStorage.setItem('SelectedBank', action.payload.SelectedBank);
      localStorage.setItem('decodedCode', action.payload.decodedCode);
    },
    clearField: (state, action) => {
      state[action.payload] = '';
      // Remove from localStorage
      localStorage.removeItem(action.payload);
    },
  },
});

// Export the actions
export const { setBank, clearField } = bankSlice.actions;

// Export the reducer
export default bankSlice.reducer;
