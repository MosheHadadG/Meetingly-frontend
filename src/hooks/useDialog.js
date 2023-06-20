import { useState } from "react";

const initialStateDialogDetails = {
  dialogTitle: null,
  dialogContent: null,
  dialogId: null,
  dialogAction: null,
  dialogCallback: null,
  dialogType: null,
  isFullScreenMobile: false,
};
const useDialog = () => {
  const [dialogIsActive, setDialogIsActive] = useState(false);
  const [dialogDetails, setDialogDetails] = useState(initialStateDialogDetails);

  const openDialog = ({
    title,
    content,
    id,
    action,
    type,
    isFullScreenMobile,
    callback,
  }) => {
    console.log(title);
    setDialogDetails({
      dialogTitle: title,
      dialogContent: content,
      dialogId: id,
      dialogAction: action,
      dialogCallback: callback,
      dialogType: type,
      isFullScreenMobile: isFullScreenMobile
        ? isFullScreenMobile
        : initialStateDialogDetails.isFullScreenMobile,
    });
    setDialogIsActive(true);
  };

  const closeDialog = () => {
    setDialogIsActive(false);
    setDialogDetails(initialStateDialogDetails);
  };

  const setUpdatedDialogContent = (updatedContent) => {
    setDialogDetails({ ...dialogDetails, dialogContent: updatedContent });
  };

  return {
    openDialog,
    closeDialog,
    dialogIsActive,
    dialogDetails,
    setUpdatedDialogContent,
  };
};

export default useDialog;
