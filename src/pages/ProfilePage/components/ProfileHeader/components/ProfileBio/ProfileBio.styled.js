import styled from "styled-components/macro";
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* justify-content: space-between; */
  /* align-items: center; */
`;

export const EditBioContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  /* align-items: flex-start; */
  /* color: var(--color-primary-purple); */
`;

export const EditProfileButton = styled.button`
  width: 50%;
  height: 32px;
  border-radius: 5px;
  border: 3px solid rgba(0, 0, 0, 0.6);
  background-color: transparent;
  font-weight: 500;
  margin: 0;
  cursor: pointer;
`;
