import React, { useContext, useState } from "react";
import * as S from "./EventJoining.styled";
import Button from "../../../../components/Input/Button/Button";
import { useUserJoinToEventMutation } from "../../../../redux/slices/apiSlices/eventsApiSlice";
import Spinner from "../../../../components/Spinner/Spinner";
import { snackBarContext } from "../../../../services/contexts/SnackBar";
import { dialogContext } from "../../../../services/contexts/Dialog";
import { useSelector } from "react-redux";
import {
  selectCurrentSocket,
  selectCurrentUser,
} from "../../../../redux/slices/authSlice";
import { useAddMemberToChatMutation } from "../../../../redux/slices/apiSlices/chatApiSlice";

function EventJoining({ privacy, title, eventId }) {
  const [userJoinToEvent, { isLoading }] = useUserJoinToEventMutation();
  const [addMemberToChat] = useAddMemberToChatMutation();
  const { openSnackBar } = useContext(snackBarContext);
  const { openDialog, closeDialog } = useContext(dialogContext);
  const [errMsg, setErrMsg] = useState();
  const socket = useSelector(selectCurrentSocket);

  const handleJoinEvent = async () => {
    try {
      closeDialog();
      const userJoining = await userJoinToEvent({ eventId, privacy }).unwrap();

      switch (privacy) {
        case "public":
          openSnackBar("success", `הצטרפת לאירוע "${title}" בהצלחה`);
          socket?.emit("sendNotification", {
            notification: userJoining.notification,
            type: "ParticipantsEventChanged",
          });
          await addMemberToChat({ eventId });
          break;
        case "private":
          openSnackBar(
            "success",
            `הבקשה להצטרף לאירוע "${title}" נשלחה בהצלחה ליוזם האירוע`
          );
          // real time socket.io
          socket?.emit("sendRequestNotification", {
            requestNotification: userJoining.requestNotification,
          });
          break;
      }
    } catch (err) {
      console.log(err);
      if (err.status === 400) {
        openSnackBar("error", err.data.error);
      } else {
        console.log(err);
      }
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <S.Container>
      {privacy === "public" ? (
        <>
          <Button
            text="הצטרף לאירוע"
            color="var(--color-primary-purple)"
            width={"60%"}
            fontSize={"1.2rem"}
            handleClick={() =>
              openDialog({
                title: "הצטרף לאירוע",
                content: "אירוע זה ציבורי לכן הנך יכול להצטרף מיד לאחר אישור השתתפות.",
                action: "אשר השתתפות",
                callback: handleJoinEvent,
              })
            }
          />
        </>
      ) : (
        <>
          <Button
            text="בקש מיוזם האירוע להצטרף"
            color="var(--color-primary-purple)"
            width={"70%"}
            fontSize={"1.1rem"}
            handleClick={() =>
              openDialog({
                title: "בקש מיוזם האירוע להצטרף",
                content:
                  "אירוע זה פרטי לכן הנך שולח בקשה ליוזם האירוע כדי שיאשר את השתתפותך באירוע.",
                action: "שלח בקשת הצטרפות",
                callback: handleJoinEvent,
              })
            }
          />
        </>
      )}
    </S.Container>
  );
}

export default EventJoining;
