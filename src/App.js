import { useCallback, useContext, useEffect, useState } from "react";
import * as S from "./App.styled";
import RoutesConfig from "./routes/RoutesConfig";
import { useSelector } from "react-redux";
import {
  setIsLoading,
  selectCurrentToken,
  setCredentials,
  setSocket,
  selectCurrentSocket,
  setUpdatedUser,
  isLoggedIn,
  setNotificationPage,
} from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { authApiSlice, useLoadUserQuery } from "./redux/slices/apiSlices/authApiSlice";
import Spinner from "./components/Spinner/Spinner";
import "./utils/timeAgo/he";
import { dialogContext } from "./services/contexts/Dialog";
import CustomizedDialog from "./components/Dialog/Dialog";
import { subDialogContext } from "./services/contexts/SubDialog";
import { io } from "socket.io-client";
import useGetNumberNotifications from "./hooks/useGetNumberNotifications";
import useGetNotificationsSocket from "./hooks/useGetNotificationsSocket";
import useGetEventsRequestsNotificationsSocket from "./hooks/useGetEventsRequestsNotificationsSocket";
import useIsDesktop from "./hooks/useIsDesktop";

function App() {
  const token = useSelector(selectCurrentToken);
  const socket = useSelector(selectCurrentSocket);
  const userLoggedIn = useSelector(isLoggedIn);

  const { closeDialog, dialogIsActive, dialogDetails } = useContext(dialogContext);
  const { closeSubDialog, subDialogIsActive, subDialogDetails } =
    useContext(subDialogContext);

  let name = "LoadUserOnRefresh";
  const { data: userData, isLoading: loadUserIsLoading } = useLoadUserQuery(name, {
    skip: !token,
  });
  useGetNumberNotifications({ userLoggedIn });
  // Socket Server Listenerer Get Notifications
  useGetNotificationsSocket({ socket, userLoggedIn });
  useGetEventsRequestsNotificationsSocket({ socket, userLoggedIn });
  useIsDesktop();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setIsLoading());
    }
  }, []);

  useEffect(() => {
    if (userData && !userLoggedIn) {
      // user is not logged in and have user data

      dispatch(setCredentials({ user: userData.user, token }));
      dispatch(setSocket(io("http://localhost:5005")));
    } else if (userData && userLoggedIn) {
      // user already logged in and user data change
      dispatch(setUpdatedUser(userData.user));
    }
  }, [userData, userLoggedIn]);

  useEffect(() => {
    if (socket && userData) {
      socket.emit("newSocketUser", {
        userId: userData.user._id,
        username: userData.user.username,
      });
    }
  }, [socket, userData]);

  return loadUserIsLoading ? (
    <Spinner />
  ) : (
    <S.Container>
      <RoutesConfig />
      {dialogIsActive && (
        <CustomizedDialog
          open={dialogIsActive}
          closeDialog={closeDialog}
          callback={dialogDetails.dialogCallback}
          title={dialogDetails.dialogTitle}
          content={dialogDetails.dialogContent}
          action={dialogDetails.dialogAction}
          type={dialogDetails.dialogType}
          isFullScreenMobile={dialogDetails.isFullScreenMobile}
          // errMsg={errMsg}
        />
      )}
      {subDialogIsActive && (
        <CustomizedDialog
          open={subDialogIsActive}
          closeDialog={closeSubDialog}
          callback={subDialogDetails.dialogCallback}
          title={subDialogDetails.dialogTitle}
          content={subDialogDetails.dialogContent}
          action={subDialogDetails.dialogAction}
          type={subDialogDetails.dialogType}
          isFullScreenMobile={subDialogDetails.isFullScreenMobile}
          // errMsg={errMsg}
        />
      )}
    </S.Container>
  );
}

export default App;
