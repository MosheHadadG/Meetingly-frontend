import React from "react";
import * as S from "./profileHeader.styled";
import ProfileAvatar from "./components/ProfileAvatar/ProfileAvatar";
import ProfileBio from "./components/ProfileBio/ProfileBio";
import CreatePrivateChat from "./components/CreateChat/CreatePrivateChat";
import { useSelector } from "react-redux";
import { selectIsDesktop } from "../../../../redux/slices/uiSlice";

function ProfileHeader({ userProfile, isUserLoggedInProfile }) {
  const isDesktop = useSelector(selectIsDesktop);

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
        isDesktop={isDesktop}
        userProfile={userProfile}
        isUserLoggedInProfile={isUserLoggedInProfile}
      />
      {!isUserLoggedInProfile && (
        <CreatePrivateChat isDesktop={isDesktop} userProfile={userProfile} />
      )}
    </S.Container>
  );
}

export default ProfileHeader;
