import styled from "styled-components/macro";
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 20px;
  margin-top: 30px; */
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const EventCoverImgPreview = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
`;

export const EventImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const WrapperUploadCoverButton = styled.div`
  position: absolute;
  bottom: 5%;
  left: 5%;
  width: 200px;
  height: 32px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #000;
  border: 3px solid #000;
  color: rgba(0, 0, 0, 0.6);
  border-color: rgba(0, 0, 0, 0.6);
  background: transparent;
`;

export const ButtonUploadSaveWrapper = styled.div`
  position: absolute;
  bottom: 0%;
  right: 0%;
  /* border-radius: 5px; */
  /* display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #000; */
  /* border: 3px solid var(--color-primary-purple); */
  /* color: rgba(0, 0, 0, 0.6); */
  /* border-color: rgba(0, 0, 0, 0.6); */
  /* background: var(--color-primary-purple); */
`;
