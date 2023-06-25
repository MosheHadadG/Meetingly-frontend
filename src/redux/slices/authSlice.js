import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const initialState = {
  isLoggedIn: false,
  user: null,
  userCoordsLocation: null,
  token: localStorage.getItem("token"),
  isLoading: false,
  numberUnreadNotifications: null,
  numberUnreadEventsRequests: null,
  notificationsPage: 1,
  eventsRequestsPage: 1,
  totalEventsRequests: null,
  makeEventsRequestsRefetch: false,
  socket: null,
  onlineUsers: [],
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.isLoggedIn = true;
      state.user = user;
      state.token = token;
      localStorage.setItem("token", token);
      state.isLoading = false;
    },
    setUpdatedUser: (state, action) => {
      state.user = action.payload;
    },
    userLogout: (state) => {
      // apiSlice.util.resetApiState();
      localStorage.removeItem("token");
      return { ...initialState, token: null };

      // state.socket.disconnect();
    },
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    setUpdatedUser: (state, action) => {
      const userUpdated = action.payload;
      state.user = userUpdated;
    },
    setUserCoordsLocation: (state, action) => {
      const userCoords = action.payload;
      state.userCoordsLocation = userCoords;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOnlineUser: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setNumberUnreadNotifications: (state, action) => {
      state.numberUnreadNotifications = action.payload;
    },
    setNumberUnreadEventsRequests: (state, action) => {
      state.numberUnreadEventsRequests = action.payload;
    },
    increaseNotificationPage: (state, action) => {
      state.notificationsPage += 1;
    },
    setNotificationPage: (state, action) => {
      state.notificationsPage = action.payload;
    },
    increaseEventsRequestsPage: (state, action) => {
      state.eventsRequestsPage += 1;
    },
    setEventsRequestsPage: (state, action) => {
      state.eventsRequestsPage = action.payload;
    },
    setTotalEventsRequests: (state, action) => {
      state.totalEventsRequests = action.payload;
    },
    setMakeEventsRequestsRefetch: (state, action) => {
      state.makeEventsRequestsRefetch = action.payload;
    },
  },
});

export const {
  setCredentials,
  userLogout,
  setIsLoading,
  setUpdatedUser,
  setUserCoordsLocation,
  setSocket,
  setOnlineUser,
  setNumberUnreadNotifications,
  setNumberUnreadEventsRequests,
  setUserFavoriteEvents,
  increaseNotificationPage,
  setNotificationPage,
  increaseEventsRequestsPage,
  setTotalEventsRequests,
  setEventsRequestsPage,
  setMakeEventsRequestsRefetch,
} = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const isLoggedIn = (state) => state.auth.isLoggedIn;
export const isLoading = (state) => state.auth.isLoading;
export const userCoordsLocation = (state) => state.auth.userCoordsLocation;
export const selectCurrentSocket = (state) => state.auth.socket;
export const selectOnlineUsers = (state) => state.auth.onlineUsers;
export const selectCurrentNumberUnreadNotifications = (state) =>
  state.auth.numberUnreadNotifications;
export const selectCurrentNumberUnreadEventsRequests = (state) =>
  state.auth.numberUnreadEventsRequests;
// export const selectUserFavoriteEvents = (state) => state.auth.userFavoriteEvents;
export const selectCurrentNotificationsPage = (state) => state.auth.notificationsPage;
export const selectCurrentEventsRequestsPage = (state) => state.auth.eventsRequestsPage;
export const selectTotalEventsRequests = (state) => state.auth.totalEventsRequests;

export const selectMakeEventsRequestsRefetch = (state) =>
  state.auth.makeEventsRequestsRefetch;
