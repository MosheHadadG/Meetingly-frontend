import styled from "styled-components/macro";

export const Container = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? "40%" : "100%")};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const CreateEventTitle = styled.p`
  font-weight: 700;
  margin: 0;
  font-size: 1.4rem;
  color: var(--color-primary-purple);
`;
