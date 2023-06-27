import styled from "styled-components/macro";
export const Container = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? "35%" : "100%")};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const LogoWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 250px;
  height: 180px;
  object-fit: cover;
`;

export const TitleWelcome = styled.h1`
  color: var(--color-primary-purple);
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  gap: 20px;
`;
