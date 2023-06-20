import styled from "styled-components/macro";
export const Container = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? "55%" : "100%")};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
