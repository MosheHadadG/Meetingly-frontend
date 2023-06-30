import React from "react";
import CardSubHeader from "../CardSubHeader/CardSubHeader";
import ForumIcon from "@mui/icons-material/Forum";
import ShareIcon from "@mui/icons-material/Share";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { CHAT } from "../../../../../../routes/CONSTANTS";

import * as S from "./EventParticipatingSubHeader.styled";
import { useState } from "react";

function EventParticipatingSubHeader({ groupChat }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();

  const copyToClip = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
  };

  return (
    <S.Container>
      <CardSubHeader
        backgroundColor={copySuccess && "var(--color-primary-purple)"}
        text={copySuccess ? "הקישור הועתק" : "העתקת קישור"}
        icon={<ShareIcon sx={{ color: copySuccess && "white" }} />}
        handleClick={copyToClip}
      />

      <CardSubHeader text={"הזמן חברים"} icon={<EmailIcon />} handleClick={() => {}} />

      <CardSubHeader
        text={"צ'אט קבוצתי"}
        icon={<ForumIcon />}
        handleClick={() =>
          groupChat && navigate(CHAT, { state: { currentChat: groupChat.chat } })
        }
      />
    </S.Container>
  );
}

export default EventParticipatingSubHeader;
