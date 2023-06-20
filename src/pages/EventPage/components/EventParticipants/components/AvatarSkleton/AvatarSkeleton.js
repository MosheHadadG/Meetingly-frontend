import React from "react";
import * as S from "./AvatarSkeleton.styled";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AvatarSkeleton() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <S.Container>
        {/* <S.ImgWrapper> */}
        <Skeleton width={50} height={50} borderRadius={"50%"} />
        {/* </S.ImgWrapper> */}
      </S.Container>
    </SkeletonTheme>
  );
}

export default AvatarSkeleton;
