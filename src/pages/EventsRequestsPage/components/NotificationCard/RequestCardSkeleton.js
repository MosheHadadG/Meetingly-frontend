import React from "react";
import Box from "@material-ui/core/Box";
import * as S from "./RequestCardSkeleton.styled";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function RequestCardSkeleton({ withoutBoxShadow }) {
  return (
    <Box
      boxShadow={withoutBoxShadow ? null : 1}
      bgcolor="background.paper"
      m={0}
      p={1}
      style={{ width: "100%", height: "125px", padding: "0" }}
    >
      <S.Container>
        <S.RequestWrapper>
          <S.AvatarContentContainer>
            <S.AvatarWrapper>
              <Skeleton circle width={46} height={46} />
            </S.AvatarWrapper>
            <S.RequestContent>
              <S.RequestContentParagraph>
                <Skeleton count={2} />
              </S.RequestContentParagraph>
            </S.RequestContent>
          </S.AvatarContentContainer>
          <S.RequestTime>
            <S.RequestTimeParagrph>
              <Skeleton count={1} />
            </S.RequestTimeParagrph>
          </S.RequestTime>
        </S.RequestWrapper>
        <S.Buttons>
          <S.Button>
            <Skeleton width="100%" height="100%" count={1} borderRadius={10} />
          </S.Button>
          <S.Button>
            <Skeleton width="100%" height="100%" count={1} borderRadius={10} />
          </S.Button>
        </S.Buttons>
      </S.Container>
    </Box>
  );
}

export default RequestCardSkeleton;
