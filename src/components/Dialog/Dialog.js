import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import ErrorParagraph from "../Input/ErrorParagraph/ErrorParagraph";
import * as S from "./Dialog.styled";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@material-ui/core";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const useStyles = makeStyles({
  dialog: {
    zIndex: 1000,
  },
});

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            left: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialog({
  open,
  closeDialog,
  // setOpen,
  title,
  content,
  action,
  type,
  callback,
  errMsg,
  isFullScreenMobile,
}) {
  const handleClose = () => {
    closeDialog();
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  console.log({ isFullScreenMobile, isMobile });
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{
          root: classes.dialog,
        }}
        fullScreen={isMobile && isFullScreenMobile}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {type === "componentContent" ? (
            <S.DialogContent>{content}</S.DialogContent>
          ) : (
            <Typography gutterBottom>{content}</Typography>
          )}
        </DialogContent>

        <DialogActions>
          {errMsg && (
            <S.DialogError>
              <ErrorParagraph text={errMsg} />
            </S.DialogError>
          )}
          {action && (
            <Button autoFocus onClick={callback}>
              {action}
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
