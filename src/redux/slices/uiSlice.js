import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isDesktop: true,
};
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDesktopOrMobile: (state, action) => {
      state.isDesktop = action.payload;
    },
  },
});

export const { setDesktopOrMobile } = uiSlice.actions;

export default uiSlice.reducer;

export const selectIsDesktop = (state) => state.ui.isDesktop;
