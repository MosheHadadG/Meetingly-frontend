import styled from "styled-components/macro";

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
