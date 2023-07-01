import React from "react";
import CardSubHeader from "../CardSubHeader/CardSubHeader";
import ForumIcon from "@mui/icons-material/Forum";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router-dom";
import { CHAT } from "../../../../../../routes/CONSTANTS";

import * as S from "./EventParticipatingSubHeader.styled";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsDesktop } from "../../../../../../redux/slices/uiSlice";
import { format } from "date-fns";
import moment from "moment";
import dayjs from "dayjs";

function EventParticipatingSubHeader({ groupChat, event: { title, date } }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();
  const isDesktop = useSelector(selectIsDesktop);

  const copyToClip = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
  };

  const inviteFriendsWhatsapp = () => {
    if (isDesktop) {
      window.open(
        `https://web.whatsapp.com:/send?text=הצטרפ/י לאירוע ${title} שמתקיים ביום ${moment(
          date
        ).format("dddd")}, ${dayjs(date).format("DD/MM/YYYY")}. אני גם אגיע!
        \n
        ${window.location.href}
        `
      );
    } else {
      window.open(
        `whatsapp:/send?text=הצטרפ/י לאירוע ${title} שמתקיים ביום ${moment(date).format(
          "dddd"
        )}, ${dayjs(date).format("DD/MM/YYYY")}. אני גם אגיע!
        \n
        ${window.location.href}
        `
      );
    }
  };

  return (
    <S.Container>
      <CardSubHeader
        backgroundColor={copySuccess && "var(--color-primary-purple)"}
        text={copySuccess ? "הקישור הועתק" : "העתקת קישור"}
        icon={<ShareIcon sx={{ color: copySuccess && "white" }} />}
        handleClick={copyToClip}
      />

      <CardSubHeader
        text={"הזמן חברים"}
        icon={<WhatsAppIcon sx={{ fontSize: "1.6rem" }} />}
        handleClick={inviteFriendsWhatsapp}
      />

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
