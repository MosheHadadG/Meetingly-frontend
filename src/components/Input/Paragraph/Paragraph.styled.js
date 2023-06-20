import styled from "styled-components/macro";

export const ParagraphContainer = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  align-items: center;
  margin: ${({ marginBottom }) => marginBottom};
  color: ${({ fontColor }) => fontColor};
`;
export const Paragraph = styled.p`
  font-size: ${({ fontSize }) => fontSize};
  margin: 0;
`;
