import styled from "styled-components/macro";
export const Container = styled.div``;

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

export const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  overflow-y: ${({ isDesktop }) => (isDesktop ? "unset" : "scroll")};
  min-height: ${({ isDesktop }) => (isDesktop ? "55vh" : "50vh")};
  max-height: ${({ isDesktop }) => (isDesktop ? "55vh" : "50vh")};
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  flex-direction: ${({ own }) => (own ? `row` : `row-reverse`)};
`;
export const Message = styled.div`
  background: ${({ own }) =>
    own
      ? `linear-gradient(98.63deg, #24e4f0 0%, #358ff9 100%)`
      : `linear-gradient(98.63deg, #f9a225 0%, #f95f35 100%)`};

  color: white;
  padding: 0.6rem;
  border-radius: ${({ own }) => (own ? `1rem 1rem 0 1rem` : `1rem 1rem 1rem 0`)};
  max-width: 15rem;
  /* width: fit-content; */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  /* align-items: ${({ own }) => (own ? `flex-start` : `flex-end`)}; */
`;

export const MessageSkeleton = styled.div`
  padding: 0.6rem;
  border-radius: ${({ own }) => (own ? `1rem 1rem 0 1rem` : `1rem 1rem 1rem 0`)};
  max-width: 28rem;
  /* width: fit-content; */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MessageText = styled.span``;
export const CreatedAt = styled.span`
  font-size: 0.7rem;
  text-align: left;
`;

export const OnlineDot = styled.div`
  background-color: greenyellow;
  border-radius: 50%;
  position: absolute;
  right: 0;
  width: 10px;
  height: 10px;
  z-index: 1;
`;

export const AvatarContainer = styled.div`
  width: 35px;
  position: relative;
`;

export const FullName = styled.span`
  font-size: 0.9rem;
`;
