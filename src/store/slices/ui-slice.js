import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isNotificationVisible: false,
    notification: null,
  },
  reducers: {
    showNotification: (state, action) => {
      state.isNotificationVisible = true;
      state.notification = {
        message: action.payload.message,
        status: action.payload.status,
        backgroundColor: action.payload.backgroundColor
      };
    },
    hideNotification: (state, action) => {
      state.isNotificationVisible = false;
      state.notification = null;
    },
  },
});

export default uiSlice.reducer;

export const uiActions = uiSlice.actions;
