import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as S from "./ProfilePage.styled";
import Spinner from "../../components/Spinner/Spinner";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import ProfileEvents from "./components/ProfileEvents/ProfileEvents";
import { useGetUserByUsernameQuery } from "../../redux/slices/apiSlices/authApiSlice";
import { selectCurrentUser } from "../../redux/slices/authSlice";
import { isUserLoggedInProfile } from "./utils/profile.utils";
import { selectIsDesktop } from "../../redux/slices/uiSlice";

function ProfilePage() {
  const { username } = useParams();
  const userProfileQuery = useGetUserByUsernameQuery(username);
  const userLoggedIn = useSelector(selectCurrentUser);
  const isDesktop = useSelector(selectIsDesktop);

  const renderProfile = () => {
    const { data: userProfile, isLoading, isSuccess } = userProfileQuery;

    if (isLoading) {
      return <Spinner />;
    } else if (isSuccess) {
      return (
        <>
          <ProfileHeader
            userProfile={userProfile}
            isUserLoggedInProfile={isUserLoggedInProfile(
              userLoggedIn._id,
              userProfile._id
            )}
          />
          <ProfileEvents
            userProfile={userProfile}
            isUserLoggedInProfile={isUserLoggedInProfile(
              userLoggedIn._id,
              userProfile._id
            )}
          />
        </>
      );
    }
  };

  return <S.Container isDesktop={isDesktop}>{renderProfile()}</S.Container>;
}

export default ProfilePage;
