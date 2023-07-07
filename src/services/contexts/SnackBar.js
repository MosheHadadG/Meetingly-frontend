import { createContext } from "react";
import useSnackBar from "../../hooks/useSnackBar";

export const snackBarContext = createContext();

function SnackBarProvider({ children }) {
  const { snackBarIsActive, openSnackBar, closeSnackBar, snackBarType, snackBarMessage } =
    useSnackBar();

  const value = {
    snackBarIsActive,
    openSnackBar,
    closeSnackBar,
    snackBarType,
    snackBarMessage,
  };

  return <snackBarContext.Provider value={value}>{children}</snackBarContext.Provider>;
}

export default SnackBarProvider;
