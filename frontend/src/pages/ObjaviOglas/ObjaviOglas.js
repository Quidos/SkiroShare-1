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
import "./ObjaviOglas.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addOglasUporabnika,
  selectOglasiUporabnika,
} from "../../redux/appSlice";
import Toast from "../../components/Toast/Toast";

import API, { BACKEND_URL } from "../../config/config.js";
import axios from "axios";
import { naloziSliko } from "../../util/utils";
import { useNavigate } from "react-router-dom";

const ObjaviOglas = () => {
  const [slikaURL, setSlikaUrl] = useState("");
  const [naziv, setNaziv] = useState("");
  const [postaja, setPostaja] = useState("");
  const [postaje, setPostaje] = useState([]);
  const [opis, setOpis] = useState("");
  const [cena, setCena] = useState("");
  const [baterija, setBaterija] = useState("");
  const [praznaPoljaError, setPraznaPoljaError] = useState([]);
  const [closeToast, setOpenToast] = useState(false);

  let navigate = useNavigate();

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

  const oddajOglas = async () => {
    if (checkEmptyFields()) return;

    const data = await API.postRequest("/skiro", {
      id_postaja: postaja,
      slika_url: slikaURL,
      naziv,
      opis,
      cena,
      baterija,
    });

    await naloziSliko(data[0].id_skiro, selectedFile);
    navigate("/mojiOglasi");
  };

  const [selectedFile, setSelectedFile] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
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

  return (
    <div className="drawerContent">
      <div className="objaviOglas">
        <div className="objaviOglasPrvi">
          <TextField
            required
            id="filled-basic"
            label="Naziv skiroja"
            sx={{ marginTop: 1, backgroundColor: "white" }}
            value={naziv}
            onChange={(e) => {
              setNaziv(e.target.value);
            }}
            error={praznaPoljaError.includes(0)}
            helperText={praznaPoljaError.includes(0) && "Prosimo vnesite polje"}
          />
          <FormControl
            fullWidth
            required
            sx={{ marginTop: 1, backgroundColor: "white" }}
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
            multiline
            sx={{ marginTop: 1, backgroundColor: "white" }}
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
            label="Cena na minuto ???"
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            sx={{ marginTop: 1, backgroundColor: "white" }}
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
            type="number"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              min: 0,
              max: 100,
            }}
            sx={{ marginTop: 1, backgroundColor: "white" }}
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
            name="skiroSlika"
            onChange={changeHandler}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Nalo??i sliko
            </Button>
          </label>
          <Button
            variant="contained"
            sx={{ marginLeft: 10 }}
            onClick={oddajOglas}
          >
            Oddaj Skiro
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
          message="Uspe??no dodan oglas"
        />
      )}
    </div>
  );
};

export default ObjaviOglas;
