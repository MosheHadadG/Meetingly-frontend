import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import * as S from "./SortEvents.styled";
import { useDispatch } from "react-redux";
import { setSortedEventsBy } from "../../../../redux/slices/eventsSlice";
import "./SortEventsMui.css";

const theme = createTheme({
  direction: "rtl",
});
export default function SortEvents({ sortedEventsBy }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setSortedEventsBy({ sortedEventsBy: e.target.value }));
  };

  return (
    <S.Container>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "30%",
            height: "100%",
          }}
        >
          <FormControl fullWidth>
            <InputLabel
              variant="standard"
              htmlFor="uncontrolled-native"
              sx={{
                right: 0,
                top: 7,
                transformOrigin: "unset",

                // fontFamily: "Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif",
              }}
            ></InputLabel>
            <NativeSelect
              onChange={handleChange}
              defaultValue={sortedEventsBy}
              inputProps={{
                name: "sortEvents",
                id: "uncontrolled-native",
              }}
              sx={{
                fontFamily: "Segoe UI" || "Tahoma" || "Geneva",
                fontSize: "0.9rem",
                fontWeight: 400,
                "&.Mui-focused": {},
              }}
            >
              <option value={"date"}>תאריך קרוב</option>
              <option value={"distance"}>מרחק קרוב</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </ThemeProvider>
    </S.Container>
  );
}
