import styled from "styled-components/macro";

export const Container = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? "35%" : "100%")};
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 45px;
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

export const LoginFormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const LoginPageFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
