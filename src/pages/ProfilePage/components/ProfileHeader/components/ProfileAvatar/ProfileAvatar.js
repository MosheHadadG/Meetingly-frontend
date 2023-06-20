import { Avatar } from "@mui/material";
import React from "react";
import * as S from "./ProfileAvatar.styled";

function ProfileAvatar({ userProfile: { firstName, lastName, avatar } }) {
  return (
    <S.Container>
      <Avatar
        alt={`${firstName} ${lastName}`}
        src={avatar}
        sx={{ width: 150, height: 150 }}
      />
    </S.Container>
  );
}

export default ProfileAvatar;
