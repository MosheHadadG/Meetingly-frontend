import React from "react";
import ProfileAvatar from "./components/ProfileAvatar/ProfileAvatar";
import CreatePrivateChat from "./components/CreateChat/CreatePrivateChat";
import { useSelector } from "react-redux";
import { selectIsDesktop } from "../../../../redux/slices/uiSlice";
import EditProfile from "./components/EditProfile/EditProfile";
import Bio from "./components/ProfileBio/Bio";

import * as S from "./profileHeader.styled";

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
      <Bio userProfile={userProfile} />

      {isUserLoggedInProfile && (
        <EditProfile isDesktop={isDesktop} userProfile={userProfile} />
      )}

      {!isUserLoggedInProfile && (
        <CreatePrivateChat isDesktop={isDesktop} userProfile={userProfile} />
      )}
    </S.Container>
  );
}

export default ProfileHeader;
