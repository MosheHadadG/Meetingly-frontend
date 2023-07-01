import styled from "styled-components/macro";
export const TextContainer = styled.span`
  font-weight: ${({ fontWeight }) => fontWeight && fontWeight};
  color: ${({ fontColor }) => fontColor};
  margin: 0 1rem;
`;
export const ButtonContainer = styled.button`
  white-space: nowrap;
  direction: rtl;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ color }) => color};
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "100%")};
  border-radius: ${({ borderRaduis }) => borderRaduis || "10px"};
  font-size: ${({ fontSize }) => fontSize || "1.3rem"};
  font-weight: ${({ fontWeight }) => fontWeight && fontWeight};
  color: white;
  padding: ${({ padding }) => padding || "1rem 2rem"};
  cursor: pointer;
  border: 1px solid var(--color-primary-purple);
  display: flex;
  justify-content: center;
  gap: 5px;

  /* box-shadow: 0 6px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%); */
`;
