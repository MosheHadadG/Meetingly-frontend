import styled from "styled-components/macro";

export const Container = styled.div`
  width: ${({ width }) => width};
  position: ${({ position }) => position || "absolute"};
  bottom: 5%;
  left: 5%;
`;

export const ButtonUploadFileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const ButtonUploadFile = styled.button`
  width: 100%;
  height: 32px;
  border-radius: 5px;
  box-shadow: ${({ isDark }) =>
    !isDark && "0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"};
  border: ${({ isDark }) =>
    isDark ? "3px solid rgba(0, 0, 0, 0.6)" : "3px solid #e4e6eb"};
  border: ${({ error }) => error && "3px solid #fc8181"};
  background-color: ${({ isDark }) => (isDark ? "transparent" : "#e4e6eb")};
`;
export const InputFile = styled.input`
  display: none;
`;
export const ButtonUploadFileSpan = styled.span`
  display: flex;
  color: #000;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const ButtonUploadFileParagraph = styled.p`
  font-weight: 500;
  margin: 0;
`;
export const ButtonUploadFileIconWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
