import styled from "styled-components/macro";
export const Container = styled.div`
  width: ${({ isDesktop, fromNotificationsPage }) =>
    isDesktop && !fromNotificationsPage ? "55%" : "100%"};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NoFoundParagraph = styled.p``;

export const RequestsHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const RequestsTitle = styled.p`
  font-weight: 600;
  margin: 0;
  font-size: 1.3rem;
  padding: 0 20px;
`;

export const RequestsShowAll = styled.a`
  padding: 0 20px;
`;

export const TotalEventsRequests = styled.p`
  padding: 0 20px;
`;
