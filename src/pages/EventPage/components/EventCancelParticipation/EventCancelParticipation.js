import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../../components/Input/Button/Button";
import Spinner from "../../../../components/Spinner/Spinner";
import { selectCurrentSocket } from "../../../../redux/slices/authSlice";
import {
  useGetEventByIdQuery,
  useUserCancelParticipationMutation,
} from "../../../../redux/slices/apiSlices/eventsApiSlice";
import { dialogContext } from "../../../../services/contexts/Dialog";
import { snackBarContext } from "../../../../services/contexts/SnackBar";
import * as S from "./EventCancelParticipation.styled";

function EventCancelParticipation({ title, eventId }) {
  const [userCancelParticipation, { isLoading, isSuccess }] =
    useUserCancelParticipationMutation();

  const { openSnackBar } = useContext(snackBarContext);
  const { openDialog, closeDialog } = useContext(dialogContext);
  const [errMsg, setErrMsg] = useState();
  const socket = useSelector(selectCurrentSocket);

  const handleJoinEvent = async () => {
    try {
      closeDialog();
      const userCanceledParticipation = await userCancelParticipation({
        eventId,
      }).unwrap();
      openSnackBar("success", `ביטלת את השתתפותך באירוע "${title}" בהצלחה`);
      // real time socket.io
      socket?.emit("sendNotification", {
        notification: userCanceledParticipation.notification,
        type: "ParticipantsEventChanged",
      });
    } catch (err) {
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
      <Button
        text="בטל השתתפות באירוע"
        color="var(--color-primary-purple)"
        width={"60%"}
        fontSize={"1.2rem"}
        handleClick={() =>
          openDialog({
            title: "בטל השתתפות באירוע",
            content: "האם אתה בטוח שאתה רוצה לבטל את ההשתתפות שלך באירוע זה?",
            action: "בטל השתתפות",
            callback: handleJoinEvent,
          })
        }
      />
    </S.Container>
  );
}

export default EventCancelParticipation;
