import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../../../../components/Input/Button/Button";
import { selectCurrentSocket } from "../../../../../../redux/slices/authSlice";
import { useUpdateEventParticipantsMutation } from "../../../../../../redux/slices/apiSlices/eventsApiSlice";
import { snackBarContext } from "../../../../../../services/contexts/SnackBar";
import { getDifferenceArrayObjects } from "../../../../utils/eventPage.utils";
import EventParticipants from "../../../EventParticipants/EventParticipants";
import * as S from "./RemoveParticipants.styled";

function RemoveParticipants({ event, closeDialog }) {
  const [participants, setParticipants] = useState(event.participants);

  const [updateEventParticipants, { isLoading }] = useUpdateEventParticipantsMutation();
  const { openSnackBar } = useContext(snackBarContext);
  const socket = useSelector(selectCurrentSocket);

  const getRemovedParticipants = () => {
    const removedParticipants = getDifferenceArrayObjects(
      event.participants,
      participants
    );

    return removedParticipants;
  };

  async function updateParticipantServer() {
    try {
      const eventParticipantsUpdatedData = await updateEventParticipants({
        participantsUpdated: participants,
        participantsDeleted: getRemovedParticipants(),
        eventId: event._id,
      }).unwrap();
      openSnackBar("success", `השינויים נשמרו`);
      socket?.emit("sendNotification", {
        notification: eventParticipantsUpdatedData,
        type: "ParticipantsEventChanged",
      });
      closeDialog();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <S.Container>
      <EventParticipants
        participants={participants}
        isRemoveParticipantsMode
        setParticipants={setParticipants}
      />

      <S.ButtonContainer>
        <Button
          text="שמור שינויים"
          color="var(--color-primary-purple)"
          type="button"
          handleClick={updateParticipantServer}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}

export default RemoveParticipants;
