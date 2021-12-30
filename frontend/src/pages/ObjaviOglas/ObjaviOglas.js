import { Box, Button, FormHelperText, TextField, Toolbar } from "@mui/material";
import React, { useState } from "react";
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

const ObjaviOglas = () => {
  const [naziv, setNaziv] = useState("");
  const [postaja, setPostaja] = useState("");
  const [opis, setOpis] = useState("");
  const [cena, setCena] = useState("");
  const [baterija, setBaterija] = useState("");
  const [praznaPoljaError, setPraznaPoljaError] = useState([]);

  const dispatch = useDispatch();
  const oglasi = useSelector(selectOglasiUporabnika);

  const checkEmptyFields = () => {
    let prazna = [];
    if (naziv.length === 0) prazna.push(0);
    if (postaja.length === 0) prazna.push(1);
    if (opis.length === 0) prazna.push(2);
    if (cena.length === 0) prazna.push(3);
    if (baterija.length === 0) prazna.push(4);

    setPraznaPoljaError(prazna);

    if (prazna.length > 0) return true;

    return false;
  };

  const oddajOglas = () => {
    if (checkEmptyFields()) return;

    let id = oglasi.length + 1;

    dispatch(
      addOglasUporabnika({
        id,
        naziv,
        postaja,
        opis,
        cena,
        baterija,
        status: "Objavljen",
        objavljeno: new Date().toLocaleString(),
      })
    );
  };

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
              <MenuItem value={"Vecna Pot 113"}>Vecna Pot 113</MenuItem>
              <MenuItem value={"Prešernov Trg"}>Prešernov Trg</MenuItem>
              <MenuItem value={"Aleja, Šiška"}>Aleja, Šiška</MenuItem>
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
            onClick={oddajOglas}
          >
            Oddaj Oglas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ObjaviOglas;
