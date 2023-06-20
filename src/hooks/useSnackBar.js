import { useState } from "react";

const useSnackBar = () => {
  const [snackBarIsActive, setSnackBarIsActive] = useState(false);
  const [snackBarType, setSnackBarType] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const openSnackBar = (type, message) => {
    setSnackBarType(type);
    setSnackBarMessage(message);
    setSnackBarIsActive(true);
  };

  const closeSnackBar = () => {
    setSnackBarIsActive(false);
    setSnackBarType("");
    setSnackBarMessage("");
  };

  return {
    snackBarIsActive,
    openSnackBar,
    closeSnackBar,
    snackBarType,
    snackBarMessage,
  };
};

export default useSnackBar;
