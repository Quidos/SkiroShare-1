// import * as React from "react";
import React from "react";

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
import API from "../../config/config";
import {
  getPostaja,
  getSkiro,
  getUporabnik,
  najemiSkiro,
} from "../../util/utils";

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
  id = -1,
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
  const [dialogData, setDialogData] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(setIzbranOglas(false));
    setOpen(false);
  };

  React.useEffect(() => {
    (async function () {
      try {
        if (open) {
          const skiroData = await getSkiro(id);
          const postajaData = await getPostaja(skiroData.id_postaja);
          const uporabnikData = await getUporabnik(skiroData.id_lastnik);

          setDialogData({
            id_skiro: skiroData.id_skiro,
            id_postaja: skiroData.id_postaja,
            postaja: postajaData.naziv_postaja,
            cena: skiroData.cena,
            najemoDajalec: uporabnikData.uporabnisko_ime,
            kontakt: uporabnikData.telefonska_stevilka,
            naziv: skiroData.naziv,
            opis: skiroData.opis,
          });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [open]);

  const najemi = async () => {
    await najemiSkiro(dialogData.id_skiro, dialogData.id_postaja);
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
          <Typography gutterBottom>{dialogData.postaja}</Typography>
          <Typography style={{ fontWeight: 600 }}>Cena na minuto</Typography>
          <Typography gutterBottom>{dialogData.cena} €</Typography>
          <Typography style={{ fontWeight: 600 }}>Najemodajalec</Typography>
          <Typography gutterBottom>{dialogData.najemoDajalec}</Typography>
          <Typography style={{ fontWeight: 600 }}>Kontakt</Typography>
          <Typography gutterBottom>{dialogData.kontakt}</Typography>
          <Typography style={{ fontWeight: 600 }}>Naziv</Typography>
          <Typography gutterBottom>{dialogData.naziv}</Typography>
          <Typography style={{ fontWeight: 600 }}>Opis</Typography>
          <Typography gutterBottom>{dialogData.opis}</Typography>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={najemi}>
            Najemi
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
