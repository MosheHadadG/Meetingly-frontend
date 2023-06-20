import styled from "styled-components/macro";
export const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const EventDescriptionTitle = styled.p`
  color: var(--color-primary-purple);
  font-weight: 500;
  margin: 0;
  font-size: 1.1rem;
`;

export const EventDescriptionSpan = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const EventDescriptionParagraph = styled.p`
  padding-right: 5px;
  font-weight: 400;
  margin: 0;
`;
