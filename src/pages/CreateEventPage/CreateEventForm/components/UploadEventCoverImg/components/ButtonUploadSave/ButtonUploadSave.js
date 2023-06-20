import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

export default function ButtonUploadSave({ loading, success, handleClick, error }) {
  const buttonSx = {
    zIndex: "unset",
    width: "35px",
    height: "35px",
    border: error && "3px solid #fc8181",
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ m: 1, position: "relative" }}>
        <Fab aria-label="save" color="primary" sx={buttonSx} onClick={handleClick}>
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={52}
            sx={{
              color: green[500],
              position: "absolute",
              top: -8,
              left: -8,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Box sx={{ m: 0, position: "relative" }}>
        <Button
          variant="contained"
          sx={{
            // backgroundColor: "var(--color-primary-purple)",
            border: error && "2px solid #fc8181",
            height: "32px",
            ...(success && {
              bgcolor: green[500],
              "&:hover": {
                bgcolor: green[700],
              },
            }),
          }}
          disabled={loading}
          onClick={handleClick}
        >
          {success ? "התמונה נשמרה" : "שמור"}
        </Button>
      </Box>
    </Box>
  );
}
