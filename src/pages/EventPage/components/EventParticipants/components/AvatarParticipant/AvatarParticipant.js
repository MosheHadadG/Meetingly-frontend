import { Avatar, Tooltip } from "@mui/material";
import React from "react";
import * as S from "./AvatarParticipant.styled";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function AvatarParticipant({
  participant,
  isRemoveParticipantsMode,
  handleRemoveParticipant,
}) {
  const navigate = useNavigate();
  return (
    <S.Container
      onClick={() =>
        !isRemoveParticipantsMode && navigate(`/profile/${participant.username}`)
      }
    >
      {isRemoveParticipantsMode && (
        <S.RemoveParticipant>
          <HighlightOffIcon onClick={() => handleRemoveParticipant(participant._id)} />
        </S.RemoveParticipant>
      )}

      <Tooltip title={`${participant.firstName} ${participant.lastName} `}>
        <Avatar sx={{ width: 50, height: 50 }} src={participant.avatar} />
      </Tooltip>
    </S.Container>
  );
}

export default AvatarParticipant;
