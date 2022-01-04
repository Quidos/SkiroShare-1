import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Snackbar,
  TextField,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./UrediOglas.css";
import Toast from "../../components/Toast/Toast";

import API from "../../config/config.js";
import { getPostaja, getSkiro } from "../../util/utils";
import { selectIzbranOglas } from "../../redux/appSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import DeleteDialog from "../../components/DeleteDialog/DeleteDialog.js";

const UrediOglas = () => {
  const [slikaURL, setSlikaUrl] = useState("");
  const [naziv, setNaziv] = useState("");
  const [postaja, setPostaja] = useState("");
  const [postaje, setPostaje] = useState([]);
  const [opis, setOpis] = useState("");
  const [cena, setCena] = useState("");
  const [baterija, setBaterija] = useState("");
  const [praznaPoljaError, setPraznaPoljaError] = useState([]);
  const [closeToast, setOpenToast] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const izbranOglas = useSelector(selectIzbranOglas);

  const params = useParams();

  const closeSnackBar = () => {
    setOpenToast(false);
  };

  const getPostaje = async () => {
    return await API.getRequest("/postaje");
  };

  const checkEmptyFields = () => {
    let prazna = [];
    if (naziv.length === 0) prazna.push(0);
    if (postaja.length === 0) prazna.push(1);
    if (opis.length === 0) prazna.push(2);
    if (cena.length === 0) prazna.push(3);
    if (baterija.length === 0) prazna.push(4);

    setPraznaPoljaError(prazna);
    setOpenToast(true);
    if (prazna.length > 0) return true;

    return false;
  };

  const posodobiOglas = async () => {
    if (checkEmptyFields()) return;

    await API.postRequest("/posodobiSkiro", {
      id_postaja: postaja,
      slika_url: slikaURL,
      naziv,
      opis,
      cena,
      baterija,
      id_skiro: params.id,
    });
  };

  const izbrisiOglas = async () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    let run = true;
    getPostaje().then((data) => {
      if (run) setPostaje(data);
    });
    return () => {
      run = false;
    };
  }, []);

  useEffect(() => {
    let run = true;

    getSkiro(parseInt(params.id)).then((skiroData) => {
      if (run) {
        setSlikaUrl(skiroData.slikaURL);
        setNaziv(skiroData.naziv);
        setPostaja(skiroData.id_postaja);
        setOpis(skiroData.opis);
        setCena(skiroData.cena);
        setBaterija(skiroData.baterija);
      }
    });
    return () => {
      run = false;
    };
  }, [params]);

  return (
    <div className="drawerContent">
      <div className="objaviOglas">
        <div className="objaviOglasPrvi">
          <TextField
            required
            id="filled-basic"
            label="Naziv skiroja"
            variant="filled"
            sx={{ marginTop: 1 }}
            value={naziv}
            onChange={(e) => {
              setNaziv(e.target.value);
            }}
            error={praznaPoljaError.includes(0)}
            helperText={praznaPoljaError.includes(0) && "Prosimo vnesite polje"}
          />
          <FormControl
            variant="filled"
            fullWidth
            required
            sx={{ marginTop: 1 }}
            error={praznaPoljaError.includes(1)}
            // helperText={praznaPoljaError.includes(1) && "Prosimo vnesite polje"}
          >
            <InputLabel id="postaja-label">Postaja</InputLabel>
            <Select
              labelId="postaja-label"
              id="postaja-id"
              value={postaja}
              label="Postaja"
              onChange={(e) => {
                setPostaja(e.target.value);
              }}
            >
              {postaje.map(({ id_postaja, naziv_postaja }) => (
                <MenuItem key={id_postaja} value={id_postaja}>
                  {naziv_postaja}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {praznaPoljaError.includes(1) && "Prosimo vnesite polje"}
            </FormHelperText>
          </FormControl>
          <TextField
            required
            id="filled-basic"
            label="Opis skiroja"
            variant="filled"
            multiline
            sx={{ marginTop: 1 }}
            value={opis}
            onChange={(e) => {
              setOpis(e.target.value);
            }}
            error={praznaPoljaError.includes(2)}
            helperText={praznaPoljaError.includes(2) && "Prosimo vnesite polje"}
          />
          <TextField
            required
            id="filled-basic"
            label="Cena €"
            variant="filled"
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            sx={{ marginTop: 1 }}
            value={cena}
            onChange={(e) => {
              setCena(e.target.value);
            }}
            error={praznaPoljaError.includes(3)}
            helperText={praznaPoljaError.includes(3) && "Prosimo vnesite polje"}
          />
          <TextField
            required
            id="filled-basic"
            label="Baterija %"
            variant="filled"
            type="number"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              min: 0,
              max: 100,
            }}
            sx={{ marginTop: 1 }}
            value={baterija}
            onChange={(e) => {
              try {
                var value = parseInt(e.target.value, 10);

                if (value > 100) value = 100;
                if (value < 0) value = 0;

                setBaterija(value);
              } catch (error) {}
            }}
            error={praznaPoljaError.includes(4)}
            helperText={praznaPoljaError.includes(4) && "Prosimo vnesite polje"}
          />
        </div>
        <div>
          <input
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Naloži sliko
            </Button>
          </label>
          <Button
            variant="contained"
            sx={{ marginLeft: 10 }}
            color="error"
            onClick={izbrisiOglas}
          >
            Zbriši Oglas
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: 10 }}
            onClick={posodobiOglas}
          >
            Posodobi
          </Button>
        </div>
      </div>
      {/* <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        /> */}
      {praznaPoljaError.length > 0 ? (
        <Toast
          open={closeToast}
          closeToast={closeSnackBar}
          severity="error"
          message="Napaka "
        />
      ) : (
        <Toast
          open={closeToast}
          closeToast={closeSnackBar}
          severity="success"
          message="Uspešno posodobljeno skiro"
        />
      )}
      <DeleteDialog id={params.id} open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default UrediOglas;
