import styled from "styled-components/macro";
export const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const EventOwnerTitle = styled.p`
  color: var(--color-primary-purple);
  font-weight: 500;
  margin: 0;
  font-size: 1.1rem;
`;

export const EventOwner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
