import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authApiSlice } from "../redux/slices/apiSlices/authApiSlice";
import { setEventsRequestsPage } from "../redux/slices/authSlice";

const useGetEventsRequestsNotificationsSocket = ({ socket, userLoggedIn }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLoggedIn) return;
    // event get notification from socket server.
    // and than update notification cache data with new notification.
    socket?.on("getRequestNotification", (requestNotificationData) => {
      dispatch(
        authApiSlice.util.updateQueryData(
          "getUserEventsRequests",
          undefined,
          (cacheRequests) => {
            if (!cacheRequests.eventsRequests) {
              dispatch(
                authApiSlice.endpoints.getUserEventsRequests.initiate(
                  { page: 1 },
                  { forceRefetch: true }
                )
              );
              dispatch(setEventsRequestsPage(1));
            } else {
              cacheRequests.eventsRequests.unshift(
                requestNotificationData.requestNotification
              );
            }
          }
        )
      );
      dispatch(authApiSlice.util.invalidateTags(["NotificationsCounter"]));
    });
  }, [socket, userLoggedIn]);

  return;
};

export default useGetEventsRequestsNotificationsSocket;
