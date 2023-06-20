import React from "react";
import Box from "@material-ui/core/Box";
import * as S from "./NotificationCardSkeleton.styled";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function NotificationCardSkeleton() {
  return (
    <Box
      boxShadow={1}
      bgcolor="background.paper"
      m={0}
      p={1}
      style={{ width: "100%", height: 80, padding: "0" }}
    >
      <S.Container>
        <S.AvatarContentContainer>
          <S.AvatarWrapper>
            <Skeleton circle width={46} height={46} />
          </S.AvatarWrapper>
          <S.NotificationContent>
            <S.NotificationContentParagraph>
              <Skeleton count={2} />
            </S.NotificationContentParagraph>
          </S.NotificationContent>
        </S.AvatarContentContainer>
        <S.NotificationTime>
          <S.NotificationTimeParagrph>
            <Skeleton count={1} />
          </S.NotificationTimeParagrph>
        </S.NotificationTime>
      </S.Container>
    </Box>
  );
}

export default NotificationCardSkeleton;
