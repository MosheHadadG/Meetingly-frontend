import styled from "styled-components/macro";
export const ErrorParagraph = styled.p`
  width: 100%;
  color: #fc8181;
  font-size: 0.75rem;
  text-align: ${({ textAlign }) => textAlign || "right"};
  margin: 0;
`;
