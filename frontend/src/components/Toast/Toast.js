import { Alert, Snackbar } from "@mui/material";
import React from "react";

const Toast = ({
  open,
  closeToast,
  severity = "success",
  timeout = 6000,
  message = "",
}) => {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={timeout}
        onClose={closeToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeToast}
          severity={severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toast;
