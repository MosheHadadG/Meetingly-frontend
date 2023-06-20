import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setDesktopOrMobile } from "../redux/slices/uiSlice";

export default function useIsDesktop() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDesktopOrMobile(isDesktop));
  }, []);

  return isDesktop;
}
