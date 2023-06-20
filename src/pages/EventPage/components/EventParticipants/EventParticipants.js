import React from "react";
import * as S from "./EventParticipants.styled";
import Avatar from "@mui/material/Avatar";
import SliderParticipants from "./components/SliderParticipants/SliderParticipants";

function EventParticipants({
  participants,
  isRemoveParticipantsMode,
  setParticipants,
  setRemovedParticipants,
}) {
  return (
    <S.Container>
      <S.EventParticipantsTitle>
        משתתפים {`(${participants.length} משתתפים)`}
      </S.EventParticipantsTitle>
      <S.EventParticipants>
        <SliderParticipants
          participants={participants}
          isRemoveParticipantsMode={isRemoveParticipantsMode}
          setParticipants={setParticipants}
        />
      </S.EventParticipants>
    </S.Container>
  );
}

export default EventParticipants;
