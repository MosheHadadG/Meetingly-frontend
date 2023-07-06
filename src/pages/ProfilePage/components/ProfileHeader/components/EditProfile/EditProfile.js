import React, { useContext, useEffect } from "react";
import { dialogContext } from "../../../../../../services/contexts/Dialog";
import EditProfileDialog from "./components/EditProfileDialog/EditProfileDialog";

import * as S from "./EditProfile.styled";

function EditProfile({ userProfile, isDesktop }) {
  const { openDialog, closeDialog, setUpdatedDialogContent, dialogDetails } =
    useContext(dialogContext);

  const updateDialogContent = () => {
    switch (dialogDetails.dialogId) {
      case "EditProfile":
        setUpdatedDialogContent(<EditProfileDialog userProfile={userProfile} />);
        break;
    }
  };

  useEffect(() => {
    if (userProfile) {
      updateDialogContent();
    }
  }, [userProfile]);

  return (
    <S.Container>
      <S.EditBioContainer>
        <S.EditProfileButton
          isDesktop={isDesktop}
          onClick={() => {
            openDialog({
              title: "עריכת פרופיל",
              content: <EditProfileDialog userProfile={userProfile} />,
              type: "componentContent",
              id: "EditProfile",
              isFullScreenMobile: true,
            });
          }}
        >
          ערוך פרופיל
        </S.EditProfileButton>
      </S.EditBioContainer>
    </S.Container>
  );
}

export default EditProfile;
