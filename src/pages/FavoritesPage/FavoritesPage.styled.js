import styled from "styled-components/macro";
export const Container = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? "55%" : "100%")};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-top: 10px;
`;

export const HeaderFavorites = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const TitleFavorites = styled.p`
  font-weight: 500;
  margin: 0;
  font-size: 1.2rem;
`;
