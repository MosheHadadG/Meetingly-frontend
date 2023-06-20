import { createContext } from "react";
import useDialog from "../../hooks/useDialog";
export const subDialogContext = createContext();

function SubDialogProvider({ children }) {
  const {
    openDialog: openSubDialog,
    closeDialog: closeSubDialog,
    dialogIsActive: subDialogIsActive,
    dialogDetails: subDialogDetails,
    setUpdatedDialogContent: setUpdatedSubDialogContent,
  } = useDialog();

  const value = {
    openSubDialog,
    closeSubDialog,
    subDialogIsActive,
    subDialogDetails,
    setUpdatedSubDialogContent,
  };

  return <subDialogContext.Provider value={value}>{children}</subDialogContext.Provider>;
}

export default SubDialogProvider;
