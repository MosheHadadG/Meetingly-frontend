import React, { useContext, useEffect } from "react";
import { dialogContext } from "../../../../../../services/contexts/Dialog";
import EditProfile from "../EditProfile/EditProfile";
import BioParagraph from "./components/BioParagraph/BioParagraph";
import * as S from "./ProfileBio.styled";
function ProfileBio({ userProfile, isUserLoggedInProfile }) {
  const { openDialog, closeDialog, setUpdatedDialogContent, dialogDetails } =
    useContext(dialogContext);

  const updateDialogContent = () => {
    switch (dialogDetails.dialogId) {
      case "EditProfile":
        setUpdatedDialogContent(<EditProfile userProfile={userProfile} />);
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
      <BioParagraph userProfile={userProfile} />
      {isUserLoggedInProfile && (
        <S.EditBioContainer>
          <S.EditProfileButton
            onClick={() => {
              openDialog({
                title: "עריכת פרופיל",
                content: <EditProfile userProfile={userProfile} />,
                type: "componentContent",
                id: "EditProfile",
                isFullScreenMobile: true,
              });
            }}
          >
            ערוך פרופיל
          </S.EditProfileButton>
          {/* <ButtonUploadFile text={"ערוך פרופיל"} isDark /> */}
          {/* <CardSubHeader icon={<EditIcon />} text="ערוך פרופיל" /> */}
        </S.EditBioContainer>
      )}
    </S.Container>
  );
}

export default ProfileBio;
