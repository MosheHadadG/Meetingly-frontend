import styled from "styled-components/macro";
export const Container = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? "50%" : "100%")};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const TitleInterests = styled.h1`
  font-size: 1.5rem;
  color: #47434d;
`;

export const InterestsContainer = styled.div`
  width: 60%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

export const InterestItem = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 3px;
  border: ${({ clicked }) => (clicked ? "0.1rem solid black" : "0.1rem solid #bfbfbf")};
  border-radius: 5px;
  box-shadow: ${({ clicked }) =>
    clicked && "0 1px 2px rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 50%);"};
`;

export const InterestTitleSpan = styled.span``;

export const InterestTitleParagraph = styled.p`
  font-weight: 500;
  margin: 0;
`;

export const InterestPageFooter = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 10px;
`;
