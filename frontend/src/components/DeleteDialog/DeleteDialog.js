import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import API from "../../config/config";
import { useNavigate } from "react-router-dom";

const DeleteDialog = ({
  id = -1,
  title = "Izbriši oglas",
  text = "Ste prepričani, da želite izbrisati oglas?",
  open,
  setOpen,
}) => {
  let navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await API.deleteRequest(`/skiro/${id}`);
    navigate("/mojiOglasi");
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ne</Button>
          <Button onClick={handleDelete} autoFocus>
            Da
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
