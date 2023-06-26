import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Spinner() {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
      <CircularProgress
        size={70}
        sx={{
          color: "var(--color-primary-purple)",
        }}
      />
    </Box>
  );
}

export default Spinner;
