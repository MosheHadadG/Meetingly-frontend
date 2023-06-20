import { style } from "@mui/system";
import styled from "styled-components/macro";

export const RangeDistanceContainer = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const RangeDistanceDetails = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const RangePlaceDetailsSpan = styled.span`
  width: 50%;
  text-align: right;
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const RangeDistanceDetailsSpan = styled.span`
  width: 50%;
  text-align: left;
`;

export const RangeDistanceParagraph = styled.p`
  font-weight: 500;
  margin: 0;
  font-size: 0.9rem;
`;

export const RangePlaceParagraph = styled.p`
  font-weight: 500;
  margin: 0;
  font-size: 0.9rem;
`;
