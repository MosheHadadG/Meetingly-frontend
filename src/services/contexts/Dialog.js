import { createContext, useState } from "react";
import useDialog from "../../hooks/useDialog";
export const dialogContext = createContext();

function DialogProvider({ children }) {
  const {
    openDialog,
    closeDialog,
    dialogIsActive,
    dialogDetails,
    setUpdatedDialogContent,
  } = useDialog();

  const value = {
    openDialog,
    closeDialog,
    dialogIsActive,
    dialogDetails,
    setUpdatedDialogContent,
  };

  return <dialogContext.Provider value={value}>{children}</dialogContext.Provider>;
}

export default DialogProvider;
