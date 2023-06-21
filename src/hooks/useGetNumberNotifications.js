import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetNumberNotificationsEventsRequestsQuery } from "../redux/slices/apiSlices/notificationsApiSlice";
import {
  setNumberUnreadEventsRequests,
  setNumberUnreadNotifications,
} from "../redux/slices/authSlice";

const useGetNumberNotifications = ({ userLoggedIn }) => {
  let name = "getNumberNotificationsEventsRequests";
  const {
    data: numberNotificationsEventsRequests,
    isLoading,
    isSuccess,
  } = useGetNumberNotificationsEventsRequestsQuery(name, { skip: !userLoggedIn });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLoggedIn) return;
    if (numberNotificationsEventsRequests) {
      dispatch(
        setNumberUnreadNotifications(numberNotificationsEventsRequests.totalNotifications)
      );
      dispatch(
        setNumberUnreadEventsRequests(
          numberNotificationsEventsRequests.totalEventsRequests
        )
      );
    }
  }, [numberNotificationsEventsRequests, userLoggedIn]);
};

export default useGetNumberNotifications;
