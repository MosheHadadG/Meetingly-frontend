import { Avatar } from "@mui/material";
import React, { useContext } from "react";
import * as S from "./profileHeader.styled";
import EditIcon from "@mui/icons-material/Edit";
import CardSubHeader from "../../../EventPage/components/EventOwnerSubHeader/components/CardSubHeader/CardSubHeader";
import ButtonUploadFile from "../../../../components/Input/ButtonUploadFile/ButtonUploadFile";
import { dialogContext } from "../../../../services/contexts/Dialog";
import EditProfile from "./components/EditProfile/EditProfile";
import ProfileAvatar from "./components/ProfileAvatar/ProfileAvatar";
import ProfileBio from "./components/ProfileBio/ProfileBio";
import CreatePrivateChat from "./components/CreateChat/CreatePrivateChat";

function ProfileHeader({ userProfile, isUserLoggedInProfile }) {
  return (
    <S.Container>
      <S.ProfileAvatarName>
        <ProfileAvatar userProfile={userProfile} />
        <S.FullNameSpan>
          <S.FullNameParagraph>
            {userProfile.firstName} {userProfile.lastName}
          </S.FullNameParagraph>
        </S.FullNameSpan>
      </S.ProfileAvatarName>
      <ProfileBio
        userProfile={userProfile}
        isUserLoggedInProfile={isUserLoggedInProfile}
      />
      {!isUserLoggedInProfile && <CreatePrivateChat userProfile={userProfile} />}
    </S.Container>
  );
}

export default ProfileHeader;
