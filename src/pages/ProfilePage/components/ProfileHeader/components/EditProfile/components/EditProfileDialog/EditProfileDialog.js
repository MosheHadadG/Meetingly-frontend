import React, { useContext } from "react";
import { subDialogContext } from "../../../../../../../../services/contexts/SubDialog";

import EditSection from "../../../../../../../EventPage/components/EventOwnerSubHeader/components/EditEvent/components/EditSection/EditSection";
import ProfileAvatar from "../../../ProfileAvatar/ProfileAvatar";
import BioParagraph from "../../../ProfileBio/Bio";
import ProfileDetails from "./components/EditProfileDetails/components/ProfileDetails/ProfileDetails";
import EditProfileAvatar from "./components/EditProfileAvatar/EditProfileAvatar";
import EditProfileBio from "./components/EditProfileBio/EditProfileBio";
import EditProfileDetails from "./components/EditProfileDetails/EditProfileDetails";

import * as S from "./EditProfileDialog.styled";

function EditProfileDialog({ userProfile }) {
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
            id: "EditEventDetails",
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
            id: "EditEventDetails",
          })
        }
      />
    </S.Container>
  );
}

export default EditProfileDialog;
