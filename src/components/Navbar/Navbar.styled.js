import styled from "styled-components/macro";
export const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: ${({ isDesktop }) => (isDesktop ? "0" : null)};
  height: ${({ isDesktop }) => (isDesktop ? "calc(100% - 75px)" : "70px")};
  width: ${({ isDesktop }) => (isDesktop ? "60px" : "100%")};
  background-color: #f7f7f7;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  z-index: 2;
`;

export const Navbar = styled.nav`
  width: 100%;
  height: 100%;
`;

export const NavbarUl = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? "column" : "row")};
  justify-content: space-around;
  align-items: center;
`;

export const NavbarLi = styled.li`
  height: 100%;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1.8px solid transparent;
  }
  .active {
    color: var(--color-primary-purple);
    border-top: ${({ isDesktop }) =>
      isDesktop ? null : "1.8px solid var(--color-primary-purple)"};
  }
`;

export const NavbarLink = styled.a``;

export const IconContainer = styled.div`
  width: 1.8rem;

  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`;
export const Counter = styled.div`
  position: absolute;
  top: -5px;
  left: 15px;
  width: 10px;
  height: 10px;
  background-color: var(--color-primary-purple);
  border-radius: 50%;
  padding: 5px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
