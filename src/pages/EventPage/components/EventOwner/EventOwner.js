import React from "react";
import * as S from "./EventOwner.styled";
import { Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
function EventOwner({ eventOwnerDetails: { username, avatar, firstName, lastName } }) {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.EventOwnerTitle>יוזם האירוע</S.EventOwnerTitle>
      <S.EventOwner>
        <Tooltip title={`${firstName} ${lastName} `}>
          <Avatar
            alt={username}
            src={avatar}
            sx={{ width: 56, height: 56, cursor: "pointer" }}
            onClick={() => navigate(`/profile/${username}`)}
          />
        </Tooltip>
      </S.EventOwner>
    </S.Container>
  );
}

export default EventOwner;
