import styled from "styled-components";

export const Wrap = styled.div`
  height: 30px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 0px;
  height: 25px;
  font-size: 1.2rem;
  border: none;
  outline: none;
  color: #555;
  padding: 3px;
  padding-right: 30px;
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  transition: 0.6s cubic-bezier(0, 0.795, 0, 1);
  cursor: pointer;

  &:focus {
    width: ${({ isDesktop }) => (isDesktop ? "40%" : "95%")};
    border-bottom: 1px solid #bbb;
    cursor: text;
  }
`;
