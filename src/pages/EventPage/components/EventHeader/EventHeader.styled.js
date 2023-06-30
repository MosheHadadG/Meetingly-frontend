import styled from "styled-components/macro";
export const Container = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const EventTitle = styled.p`
  font-weight: 700;
  margin: 0;
  font-size: 1.3rem;
`;

export const WrapperImg = styled.div`
  width: 100%;
  height: ${({ isDesktop }) => (isDesktop ? "280px" : "220px")};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
`;

export const EventImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ isDesktop }) => isDesktop && "5px"};
`;

export const EditEventImgWrapper = styled.div`
  position: absolute;
  bottom: 5%;
  left: 5%;
  width: 80px;
  height: 32px;
  border-radius: 5px;
  background-color: #e4e6eb;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
