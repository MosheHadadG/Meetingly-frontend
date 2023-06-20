import styled from "styled-components/macro";
export const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
`;

export const EditSectionHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EditSectionButton = styled.div`
  width: 60px;
  height: 30px;
  border-radius: 10px;
  font-weight: 500;
  background-color: var(--color-primary-purple);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const EditSectionTitle = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
`;
export const EditSectionContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
