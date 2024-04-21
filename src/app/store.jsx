import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import alertReducer from "../features/alert/alertSlice";
import bankReducer from "../features/bankMode/bankSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    alert: alertReducer,
    bank: bankReducer,
  },
});
