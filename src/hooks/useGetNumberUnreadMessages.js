import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetNumberUnreadMessagesQuery } from "../redux/slices/apiSlices/chatApiSlice";
import { setNumberUnreadChatsData } from "../redux/slices/chatSlice";

const useGetNumberUnreadMessages = ({ userLoggedIn }) => {
  let name = "getNumberNotificationsEventsRequests";
  const {
    data: numberUnreadChatsData,
    isLoading,
    isSuccess,
  } = useGetNumberUnreadMessagesQuery(name, { skip: !userLoggedIn });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLoggedIn) return;
    if (numberUnreadChatsData) {
      dispatch(setNumberUnreadChatsData(numberUnreadChatsData));
    }
  }, [numberUnreadChatsData, userLoggedIn]);
};

export default useGetNumberUnreadMessages;
