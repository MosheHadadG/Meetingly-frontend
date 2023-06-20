import styled from "styled-components/macro";
export const Container = styled.div`
  width: 100%;
  /* height: 120px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  justify-content: center;
  position: relative;
  /* read */
  filter: ${({ isRead }) => isRead && "opacity(0.8)"};
  /* filter: opacity(0.8); */
`;

export const NotificationSetting = styled.div`
  position: absolute;
  right: 5px;
`;

export const AvatarContentContainer = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-right: 15px; */
  gap: 20px;
`;

export const AvatarWrapper = styled.div`
  /* display: flex;
  justify-content: center; */
  /* display: flex;
  justify-content: center; */
  width: 15%;
`;

export const NotificationContent = styled.div`
  /* display: flex;
  justify-content: center; */
  width: 60%;
`;

export const NotificationContentParagraph = styled.p``;

export const NotificationTime = styled.div`
  /* display: flex;
  justify-content: center; */
  width: 20%;
`;

export const NotificationTimeParagrph = styled.p``;
