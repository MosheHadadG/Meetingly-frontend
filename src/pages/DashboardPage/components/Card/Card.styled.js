import styled, { keyframes, css } from "styled-components/macro";
import { Favorite } from "@mui/icons-material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const blinkAnimation = keyframes`
  0% {
    color: #e22d2d;
  }
  50% {
    color: unset;
  }
  100% {
    color: #e22d2d;
  }
`;

const blinkAnimationCss = css`
  animation: ${blinkAnimation} 3s;
`;

export const Container = styled.div`
  width: 150px;
  height: 130px;
  margin: 0 3px;
  /* margin: 0 20px; */
  transition: 0.5s;
  cursor: pointer;
`;

export const FavoriteIconContainer = styled.div`
  position: absolute;
  top: 3%;
  right: 5%;
  display: inline-block;
  cursor: pointer;
`;

export const FavoriteIcon = styled(Favorite)`
  font-size: 30px !important;
  color: ${({ isloading }) => (isloading ? "#e22d2d" : "#e22d2d")};
  ${({ isloading }) =>
    isloading
      ? css`
          animation: ${blinkAnimation} 1s infinite linear;
        `
      : ""};
`;

export const FavoriteBorderIcon = styled(FavoriteBorderOutlinedIcon)`
  font-size: 30px !important;
  color: ${({ isloading }) => (isloading ? "" : "")};
  ${({ isloading }) =>
    isloading
      ? css`
          animation: ${blinkAnimation} 1s infinite linear;
        `
      : ""};
`;

export const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  /* display: flex;
  flex-direction: center;
  align-items: center; */
`;

export const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
`;

export const CardTitleSpan = styled.span`
  position: absolute;
  top: 45%;
  left: 0;
  width: 100%;
`;

export const CardTitleParagraph = styled.p`
  width: 100%;
  font-size: 1rem;
  text-align: center;
  color: #f4f4f4;
  text-shadow: 2px 2px black;
`;

export const CardPlaceSpan = styled.span`
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
`;
export const CardPlaceParagraph = styled.p``;
