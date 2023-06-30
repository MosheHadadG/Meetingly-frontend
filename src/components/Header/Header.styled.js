import styled from "styled-components/macro";

export const Container = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 5;
  box-shadow: rgb(0 0 0 / 3%) 0px 2px 1px -1px, rgb(0 0 0 / 2%) 0px 1px 1px 0px,
    rgb(0 0 0 / 6%) 0px 1px 3px 0px;
  margin-bottom: 10px;
`;

export const NavBarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

export const UserWelcome = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 10px;
`;

export const AvatarContainer = styled.div`
  position: relative;
`;

export const UserMenuArrow = styled.div`
  position: absolute;
  cursor: pointer;
  bottom: -23px;
  left: 8px;
`;

export const LogoWrapper = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  /* padding: 10px 0; */
`;

export const Logo = styled.img`
  width: 130px;
  height: 100%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
`;

export const ChatIconContainer = styled.div`
  width: 1.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
`;

export const Counter = styled.div`
  position: absolute;
  top: -10px;
  left: 10px;
  width: 8px;
  height: 8px;
  background-color: var(--color-primary-purple);
  border-radius: 50%;
  padding: 5px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
