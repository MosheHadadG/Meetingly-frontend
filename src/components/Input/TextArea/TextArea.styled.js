import styled from "styled-components/macro";

export const TextArea = styled.textarea`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "6rem")};
  padding: 1rem 0;
  text-align: right;
  text-indent: 10px;
  font-size: 1.2rem;
  color: #47434d;
  border: 0.1rem solid;
  border-color: ${({ error }) => (error ? "#fc8181" : "#bfbfbf")};
  border-radius: 0.5rem;
  margin: ${({ margin }) => (margin ? margin : "0.5rem 0")};
  opacity: ${({ disabled }) => (disabled ? "30%" : "100%")};
  background-color: white;
  box-shadow: ${({ boxShadow }) => boxShadow && "rgba(149, 157, 165, 0.2) 0px 8px 24px"};
  /* margin-top: 15px; */
  &:focus {
    outline: ${({ error }) => error && "none"};
    box-shadow: ${({ error }) => error && "0px 0px 2px red"};
  }
`;
