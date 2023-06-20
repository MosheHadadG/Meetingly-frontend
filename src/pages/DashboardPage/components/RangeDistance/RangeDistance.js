import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import * as S from "./RangeDistance.styled";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NearMeIcon from "@mui/icons-material/NearMe";
import "./RangeDistanceMui.css";
import { useDispatch } from "react-redux";
import { setDistanceFromEvent } from "../../../../redux/slices/eventsSlice";

const theme = createTheme({
  direction: "rtl",
});

function RangeDistance({ userDistanceRange, userLocation, userLoggedIn }) {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setDistanceFromEvent({ distance: event.target.value }));
  };

  return (
    <S.RangeDistanceContainer>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%" }}>
          <Slider
            min={5}
            max={200}
            step={5}
            value={userDistanceRange}
            color="secondary"
            onChange={handleChange}
            sx={{ color: "var(--color-primary-purple)" }}
          />
        </Box>
      </ThemeProvider>
      <S.RangeDistanceDetails>
        <S.RangePlaceDetailsSpan>
          <NearMeIcon
            sx={{
              color: "var(--color-primary-purple)",
              transform: "rotate(280deg)",
              fontSize: "0.9rem",
            }}
          />
          <S.RangePlaceParagraph>
            {userLocation ? "סביב מיקומך הנוכחי" : `סביב ${userLoggedIn.city}`}
          </S.RangePlaceParagraph>
        </S.RangePlaceDetailsSpan>
        <S.RangeDistanceDetailsSpan>
          <S.RangeDistanceParagraph>
            עד {userDistanceRange} ק"מ
          </S.RangeDistanceParagraph>
        </S.RangeDistanceDetailsSpan>
      </S.RangeDistanceDetails>
    </S.RangeDistanceContainer>
  );
}

export default RangeDistance;
