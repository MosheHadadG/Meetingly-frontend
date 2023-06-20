import { Avatar } from "@mui/material";
import React, { useContext } from "react";
import { subDialogContext } from "../../../../../../services/contexts/SubDialog";
import EditSection from "../../../../../EventPage/components/EventOwnerSubHeader/components/EditEvent/components/EditSection/EditSection";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import BioParagraph from "../ProfileBio/components/BioParagraph/BioParagraph";
import EditProfileAvatar from "./components/EditProfileAvatar/EditProfileAvatar";
import EditProfileBio from "./components/EditProfileBio/EditProfileBio";
import ProfileDetails from "./components/EditProfileDetails/components/ProfileDetails/ProfileDetails";
import EditProfileDetails from "./components/EditProfileDetails/EditProfileDetails";
import * as S from "./EditProfile.styled";
function EditProfile({ userProfile }) {
  const { openSubDialog, closeSubDialog, subDialogDetails, setUpdatedSubDialogContent } =
    useContext(subDialogContext);

  return (
    <S.Container>
      <EditSection
        title={"תמונת פרופיל"}
        content={<ProfileAvatar userProfile={userProfile} />}
        handleClick={() =>
          openSubDialog({
            title: "ערוך תמונת פרופיל",
            content: (
              <EditProfileAvatar
                userProfile={userProfile}
                closeSubDialog={closeSubDialog}
              />
            ),
            type: "componentContent",
            // id: "EditEventCover",
          })
        }
      />

      <EditSection
        title={"ביוגרפיה"}
        content={<BioParagraph userProfile={userProfile} />}
        handleClick={() =>
          openSubDialog({
            title: "ערוך ביוגרפיה",
            content: (
              <EditProfileBio userProfile={userProfile} closeSubDialog={closeSubDialog} />
            ),
            type: "componentContent",
            // action: "שמור שינויים",
            id: "EditEventDetails",
            // callback: () => submitForm(),
          })
        }
      />

      <EditSection
        title={"פרטים אישיים"}
        content={<ProfileDetails userProfile={userProfile} />}
        handleClick={() =>
          openSubDialog({
            title: "ערוך פרטים אישיים",
            content: (
              <EditProfileDetails
                userProfile={userProfile}
                closeSubDialog={closeSubDialog}
              />
            ),
            type: "componentContent",
            // action: "שמור שינויים",
            id: "EditEventDetails",
            // callback: () => submitForm(),
          })
        }
      />
    </S.Container>
  );
}

export default EditProfile;
