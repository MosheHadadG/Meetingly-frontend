import React from "react";
import * as S from "./EventOwner.styled";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
function EventOwner({ username, avatar }) {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.EventOwnerTitle>יוזם האירוע</S.EventOwnerTitle>
      <S.EventOwner>
        <Avatar
          alt={username}
          src={avatar}
          sx={{ width: 56, height: 56 }}
          onClick={() => navigate(`/profile/${username}`)}
        />
      </S.EventOwner>
    </S.Container>
  );
}

export default EventOwner;
