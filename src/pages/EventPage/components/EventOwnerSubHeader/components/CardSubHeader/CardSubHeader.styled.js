import styled from "styled-components/macro";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
export const CardSubHeaderCircle = styled.div`
  background: ${({ backgroundColor }) => backgroundColor || "#e4e6eb"};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  text-align: center;
`;

export const CardSubHeaderIconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardSubHeaderSpan = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
export const CardSubHeaderParagraph = styled.p`
  font-weight: 500;
  margin: 0;
`;
