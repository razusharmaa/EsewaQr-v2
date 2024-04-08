import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  SelectedBank: '',
  decodedCode:'',
};

// Create the slice
const bankSlice = createSlice({
    name: 'bank',
    initialState,
    reducers: {
      setBank: (state, action) => {
        state.SelectedBank = action.payload.SelectedBank;
        state.decodedCode = action.payload.decodedCode;
      },
      clearField: (state, action) => {
        state[action.payload] = '';
      },
    },
  });
  
  // Export the actions
  export const { setBank, clearField } = bankSlice.actions;
  
  // Export the reducer
  export default bankSlice.reducer;
  
  