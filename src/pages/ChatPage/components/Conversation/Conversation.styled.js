import styled from "styled-components/macro";

export const Conversation = styled.div`
  border-radius: 0.5rem;
  padding: 10px;
  display: flex;
  gap: 5px;
  /* justify-content: space-between; */
  align-items: center;
  border-bottom: 2px solid #ececec;
  position: relative;

  &&:hover {
    background: #80808038;
    cursor: pointer;
  }
`;

export const ConversationSkeleton = styled.div`
  border-radius: 0.5rem;
  padding: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
  border-bottom: 2px solid #ececec;
`;

export const UserContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const AvatarContainer = styled.div`
  width: 56px;
  position: relative;
`;
export const OnlineDot = styled.div`
  background-color: greenyellow;
  border-radius: 50%;
  position: absolute;
  right: 0;
  width: 14px;
  height: 14px;
  z-index: 1;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: "0.8rem";
`;

export const UserFullName = styled.span`
  font-weight: bold;
`;

export const UserStatus = styled.span``;

export const Counter = styled.div`
  position: absolute;
  top: 45%;
  left: 10%;
  width: 10px;
  height: 10px;
  background-color: var(--color-primary-purple);
  border-radius: 50%;
  padding: 5px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
