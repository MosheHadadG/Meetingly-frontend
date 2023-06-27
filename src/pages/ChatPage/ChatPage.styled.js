import styled from "styled-components/macro";
export const Container = styled.div``;

export const Chat = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const LeftSideChat = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? "65%" : "100%")};
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ScrollContainer = styled.div`
  ${({ isDesktop }) =>
    isDesktop &&
    `  width: 100%;
  /* height: 500px; */
  overflow-y: scroll;
  position: relative;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }`}
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.64);
  border-radius: 1rem;
  padding: 1rem;
  height: auto;
  min-height: 80vh;
  overflow-y: ${({ isDesktop }) => (isDesktop ? "unset" : "scroll")};
`;

export const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RightSideChat = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? "20%" : "100%")};
  display: ${({ chatBoxOpen, isDesktop }) =>
    !isDesktop && chatBoxOpen ? "none" : "flex"};
  flex-direction: column;
  gap: 1rem;
`;

export const ChatBoxEmpyMessage = styled.span`
  display: flex;
  align-self: center;
  justify-content: center;
  font-size: 20px;
  position: absolute;
  top: 9%;
`;
