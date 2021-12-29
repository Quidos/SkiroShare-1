import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import DateTimeInput from "../DateTimeInput/DateTimeInput";
import { useDispatch } from "react-redux";
import { setIzbranOglas } from "../../redux/appSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
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
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({
  open,
  setOpen,
  postaja = "Večna Pot 113",
  cena = "0.13",
  najemoDajalec = "Janez Novak",
  kontakt = "051-245-621",
  naziv = "Skirca",
  opis = "Praesent commodo cursus magna, vel scelerisque nisl consectetur etVivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
}) {
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(setIzbranOglas(false));
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Električno Skiro
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="OglasDialogDatumi">
            <DateTimeInput label="Zacetek Najema" disabled={true} />
            <DateTimeInput label="Konec Najema" />
          </div>
          <Typography style={{ fontWeight: 600 }}>Postaja</Typography>
          <Typography gutterBottom>{postaja}</Typography>
          <Typography style={{ fontWeight: 600 }}>Cena na minuto</Typography>
          <Typography gutterBottom>{cena} €</Typography>
          <Typography style={{ fontWeight: 600 }}>Najemodajalec</Typography>
          <Typography gutterBottom>{najemoDajalec}</Typography>
          <Typography style={{ fontWeight: 600 }}>Kontakt</Typography>
          <Typography gutterBottom>{kontakt}</Typography>
          <Typography style={{ fontWeight: 600 }}>Naziv</Typography>
          <Typography gutterBottom>{naziv}</Typography>
          <Typography style={{ fontWeight: 600 }}>Opis</Typography>
          <Typography gutterBottom>{opis}</Typography>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Najemi
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
