import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentChatUserData: null,
  numberUnreadChatsData: null,
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChatUserData: (state, action) => {
      state.currentChatUserData = action.payload;
    },
    setNumberUnreadChatsData: (state, action) => {
      state.numberUnreadChatsData = action.payload;
    },
  },
});

export const { setCurrentChatUserData, setNumberUnreadChatsData } = chatSlice.actions;

export default chatSlice.reducer;

export const selectCurrentChatUserData = (state) => state.chat.currentChatUserData;
export const selectNumberUnreadChatsData = (state) => state.chat.numberUnreadChatsData;
