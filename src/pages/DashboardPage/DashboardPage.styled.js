import styled from "styled-components/macro";
export const Container = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? "55%" : "100%")};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-top: 10px;
`;

export const HeaderDashboard = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const TitleDashboard = styled.p`
  font-weight: 500;
  margin: 0;
  font-size: 1.1rem;
`;

export const SliderEvents = styled.div`
  width: 100%;
  height: 100%;
  /* margin-bottom: 50px; */
`;

export const TitleSlider = styled.p`
  font-weight: 500;
  padding: 0 15px;
  font-size: 1rem;
  margin: 10px 0;
`;

export const Events = styled.div`
  width: 100%;
  /* /* display: flex; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
