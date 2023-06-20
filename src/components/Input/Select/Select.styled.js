import styled from "styled-components/macro";
export const Select = styled.select`
  width: ${({ width }) => (width ? width : "100%")};
  min-height: ${({ height }) => (height ? height : "1.5rem")};
  padding: 0.6rem;
  font-size: 1.6rem;
  color: #47434d;
  border: 0.1rem solid;
  border-color: ${({ error }) => (error ? "#fc8181" : "#bfbfbf")};
  border-radius: 0.5rem;
  margin: ${({ margin }) => (margin ? margin : "0.5rem 0")};
  opacity: ${({ disabled }) => (disabled ? "30%" : "100%")};
  background-color: white;
  text-align: right;
  direction: rtl;
  /* margin-top: 15px; */
  &:focus {
    outline: ${({ error }) => error && "none"};
    box-shadow: ${({ error }) => error && "0px 0px 2px red"};
  }
`;
