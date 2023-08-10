import React, { useState, useEffect } from "react";
import { Snackbar, Fade, Alert, AlertColor } from "@mui/material";
import { useAppSelector, useAppDispatch } from './../../hooks'
import { hideSnackbar } from "../../reducers/appState";

export interface SBProps {
  snackbarShowMessage: Function
}

export function withSnackbar<P>(WrappedComponent: React.ComponentType<P & SBProps>) {

  const Component = (props: P) => {
    const dispatch = useAppDispatch
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("I'm a custom snackbar");
    const [duration, setDuration] = useState(2000);
    const [severity, setSeverity] = useState(
      "success"
    ); /** error | warning | info */

    const selector = useAppSelector(state => state.snackbar);

    useEffect(() => {
      debugger
      setOpen(selector.visible)
      setMessage(selector.message)
      setSeverity(selector.severity)
      setDuration(selector.duration)
    }, [selector])

    const handleClose = (event: any) => {
      debugger
      dispatch(hideSnackbar())
    };


    const showMessage = (message: string, severity: AlertColor, duration = 2000) => {

      setMessage(message);
      setSeverity(severity);
      setDuration(duration);
      setOpen(true);
    };

    return (
      <>
        <WrappedComponent {...props} snackbarShowMessage={showMessage} />
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          autoHideDuration={duration}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <Alert variant="filled" onClose={handleClose} severity={severity as AlertColor}>
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  }
  return Component;
};
