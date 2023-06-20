import { Avatar } from "@mui/material";
import React from "react";
import * as S from "./NotificationCard.styled";
import Box from "@material-ui/core/Box";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import NotificationCardSettings from "./components/NotificationCardSettings/NotificationCardSettings";

function NotificationCard({ notification, notificationRef }) {
  const { content, createdAt, sender, _id: notificationId, isRead } = notification;

  const navigate = useNavigate();

  return (
    <Box
      boxShadow={1}
      bgcolor="background.paper"
      m={0}
      p={1}
      style={{ width: "100%", height: 80, padding: "0" }}
    >
      <S.Container ref={notificationRef} isRead={notification.isRead}>
        <S.NotificationSetting>
          <NotificationCardSettings notificationId={notificationId} isRead={isRead} />
        </S.NotificationSetting>
        <S.AvatarContentContainer>
          <S.AvatarWrapper>
            <Avatar
              alt={"name"}
              src={sender.avatar}
              sx={{ width: 46, height: 46 }}
              onClick={() => navigate(`/profile/${sender.username}`)}
            />
          </S.AvatarWrapper>
          <S.NotificationContent>
            <S.NotificationContentParagraph>{content}</S.NotificationContentParagraph>
          </S.NotificationContent>
        </S.AvatarContentContainer>
        <S.NotificationTime>
          <S.NotificationTimeParagrph>
            {format(createdAt, "he_HE")}
          </S.NotificationTimeParagrph>
        </S.NotificationTime>
      </S.Container>
    </Box>
  );
}

export default NotificationCard;
