import styled from "styled-components/macro";
export const Container = styled.div``;

export const ChatBoxContainer = styled.div`
  background: var(--cardColor);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: ${({ isDesktop }) => (isDesktop ? `80vh` : `%`)}; */
  /* display: grid;
  grid-template-rows: 14vh 60vh 13vh; */
`;
