import React, { useContext, useEffect, useState } from "react";
import CardSubHeader from "./components/CardSubHeader/CardSubHeader";
import * as S from "./EventOwnerSubHeader.styled";
import SettingsIcon from "@mui/icons-material/Settings";
import LinkIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import EmailIcon from "@mui/icons-material/Email";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import { dialogContext } from "../../../../services/contexts/Dialog";
import EditEvent from "./components/EditEvent/EditEvent";
import RemoveParticipants from "./components/RemoveParticipants/RemoveParticipants";
import { useLocation } from "react-router-dom";
function EventOwnerSubHeader({ event }) {
  const { openDialog, closeDialog, setUpdatedDialogContent, dialogDetails } =
    useContext(dialogContext);

  const [copySuccess, setCopySuccess] = useState(false);

  const updateDialogContent = () => {
    switch (dialogDetails.dialogId) {
      case "EditEvent":
        setUpdatedDialogContent(<EditEvent event={event} />);
        break;
    }
  };

  useEffect(() => {
    if (event) {
      updateDialogContent();
    }
  }, [event]);

  async function copyToClip() {
    await navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    // setTimeout(() => {
    //   setCopySuccess(false);
    // }, 3000);
  }

  return (
    <S.Container>
      <CardSubHeader
        text={"עריכת האירוע"}
        icon={<EditIcon />}
        handleClick={() =>
          openDialog({
            title: "עריכת האירוע",
            content: <EditEvent event={event} />,
            type: "componentContent",
            id: "EditEvent",
            isFullScreenMobile: true,
          })
        }
      />
      <CardSubHeader
        backgroundColor={copySuccess && "var(--color-primary-purple)"}
        text={copySuccess ? "הקישור הועתק" : "העתקת קישור"}
        icon={<ShareIcon sx={{ color: copySuccess && "white" }} />}
        handleClick={copyToClip}
      />
      <CardSubHeader
        text={"הזמנת חברים"}
        icon={<EmailIcon />}
        handleClick={() =>
          openDialog({
            title: "הזמן חברים",
            content: "שלח בווצאפ או במייל",
            id: "InviteFriends",
            // action: "בטל השתתפות באירוע",
            // callback: editEventClicked,
          })
        }
      />
      <CardSubHeader
        text={"הסרת משתתפים"}
        icon={<GroupRemoveIcon />}
        handleClick={() =>
          openDialog({
            title: "הסר משתתפים",
            content: <RemoveParticipants event={event} closeDialog={closeDialog} />,
            type: "componentContent",
            id: "RemovingParticipants",
            // action: "שמור שינויים",

            // callback: editEventClicked,
          })
        }
      />
    </S.Container>
  );
}

export default EventOwnerSubHeader;
