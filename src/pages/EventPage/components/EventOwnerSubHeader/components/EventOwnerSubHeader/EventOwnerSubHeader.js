import React, { useContext, useEffect, useState } from "react";
import CardSubHeader from "../CardSubHeader/CardSubHeader";
import * as S from "../../EventSubHeader.styled";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import { dialogContext } from "../../../../../../services/contexts/Dialog";
import EditEvent from "../EditEvent/EditEvent";
import RemoveParticipants from "../RemoveParticipants/RemoveParticipants";
import ForumIcon from "@mui/icons-material/Forum";
import { useNavigate } from "react-router-dom";
import { CHAT } from "../../../../../../routes/CONSTANTS";

function EventOwnerSubHeader({ event, groupChat }) {
  const { openDialog, closeDialog, setUpdatedDialogContent, dialogDetails } =
    useContext(dialogContext);
  const [copySuccess, setCopySuccess] = useState(false);

  const navigate = useNavigate();

  const updateDialogContent = () => {
    switch (dialogDetails.dialogId) {
      case "EditEvent":
        setUpdatedDialogContent(<EditEvent event={event} />);
        break;
    }
  };

  const copyToClip = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
  };

  useEffect(() => {
    if (event) {
      updateDialogContent();
    }
  }, [event]);

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
        text={"צ'אט קבוצתי"}
        icon={<ForumIcon />}
        handleClick={() => navigate(CHAT, { state: { currentChat: groupChat.chat } })}
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
          })
        }
      />
    </S.Container>
  );
}

export default EventOwnerSubHeader;
