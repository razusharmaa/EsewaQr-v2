import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  message: "",
  type: "", // 'info', 'success', 'failure', 'warning'
};

// Create the slice
const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearAlert: (state) => {
      state.message = "";
      state.type = "";
    },
  },
});

// Export the actions
export const { setAlert, clearAlert } = alertSlice.actions;

// Export the reducer
export default alertSlice.reducer;
