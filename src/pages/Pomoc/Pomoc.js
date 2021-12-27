import { Button, TextField, Toolbar } from "@mui/material";
import React from "react";

const Pomoc = () => {
  return (
    <div className="drawerContent">
      <div className="pomoc">
        <TextField
          id="filled-basic"
          label="Zadeva"
          variant="filled"
          sx={{ marginTop: 1 }}
        />
        <TextField
          id="filled-basic"
          label="Opis težave"
          variant="filled"
          multiline
          rows={10}
          sx={{ marginTop: 1 }}
        />
        <Button variant="contained" sx={{ marginTop: 2, width: "10%" }}>
          Pošlji
        </Button>
      </div>
    </div>
  );
};

export default Pomoc;
