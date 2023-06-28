import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentChatData: null,
  numberUnreadChatsData: null,
  isPrivateMode: true,
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChatData: (state, action) => {
      state.currentChatData = action.payload;
    },
    setNumberUnreadChatsData: (state, action) => {
      state.numberUnreadChatsData = action.payload;
    },
    setIsPrivateMode: (state, action) => {
      state.isPrivateMode = action.payload;
    },
  },
});

export const { setCurrentChatData, setNumberUnreadChatsData, setIsPrivateMode } =
  chatSlice.actions;

export default chatSlice.reducer;

export const selectCurrentChatData = (state) => state.chat.currentChatData;
export const selectNumberUnreadChatsData = (state) => state.chat.numberUnreadChatsData;
export const selectIsPrivateMode = (state) => state.chat.isPrivateMode;
