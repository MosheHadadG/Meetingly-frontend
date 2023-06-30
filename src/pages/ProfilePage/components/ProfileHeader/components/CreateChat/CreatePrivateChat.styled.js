import styled from "styled-components/macro";

export const CreateChatButton = styled.button`
  width: ${({ isDesktop }) => (isDesktop ? "40%" : "50%")};
  height: 32px;
  border-radius: 5px;
  border: 3px solid rgba(0, 0, 0, 0.6);
  background-color: transparent;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

export const CreateChatSpan = styled.span``;
