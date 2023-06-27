import styled from "styled-components/macro";
export const Container = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? "40%" : "100%")};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NotificationsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NotificationsHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const NotificationsTitle = styled.p`
  font-weight: 600;
  margin: 0;
  font-size: 1.3rem;
  padding: 0 20px;
`;

export const NotificationsSettings = styled.div`
  padding: 0 20px;
`;

export const NotificationsRequestsHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const NotificationsRequestsTitle = styled.p`
  font-weight: 600;
  margin: 0;
  font-size: 1.3rem;
  padding: 0 20px;
`;

export const NotificationsRequestsShowAll = styled.a`
  padding: 0 20px;
`;

export const NoFoundParagraph = styled.p``;
