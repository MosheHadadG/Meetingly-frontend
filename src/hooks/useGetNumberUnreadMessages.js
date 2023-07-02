import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetNumberUnreadMessagesQuery } from "../redux/slices/apiSlices/chatApiSlice";
import {
  selectCurrentSocket,
  setOnlineUser,
  setOnlineUsers,
} from "../redux/slices/authSlice";
import { setNumberUnreadChatsData } from "../redux/slices/chatSlice";

const useGetNumberUnreadMessages = ({ userLoggedIn }) => {
  let name = "getNumberNotificationsEventsRequests";
  const {
    data: numberUnreadChatsData,
    isLoading,
    isSuccess,
  } = useGetNumberUnreadMessagesQuery(name, { skip: !userLoggedIn });
  const dispatch = useDispatch();
  const socket = useSelector(selectCurrentSocket);

  useEffect(() => {
    if (!userLoggedIn) return;

    if (numberUnreadChatsData) {
      socket?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      dispatch(setNumberUnreadChatsData(numberUnreadChatsData));
    }
  }, [socket, numberUnreadChatsData, userLoggedIn]);
};

export default useGetNumberUnreadMessages;
