import { Box, Button, TextField, Toolbar } from "@mui/material";
import React from "react";
import "./ObjaviOglas.css";

const ObjaviOglas = () => {
  return (
    <div className="drawerContent">
      <div className="objaviOglas">
        <div className="objaviOglasPrvi">
          <TextField
            id="filled-basic"
            label="Ime skiroja"
            variant="filled"
            sx={{ marginTop: 1 }}
          />
          <TextField
            id="filled-basic"
            label="Opis skiroja"
            variant="filled"
            multiline
            sx={{ marginTop: 1 }}
          />
          <TextField
            id="filled-basic"
            label="Cena"
            variant="filled"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            sx={{ marginTop: 1 }}
          />
        </div>
        <div>
          <Button variant="contained">Naloži sliko</Button>
          <Button variant="contained" sx={{ marginLeft: 10 }}>
            Oddaj Oglas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ObjaviOglas;
