import { Button, TextField, Toolbar } from "@mui/material";
import React, { useState } from "react";
import Toast from "../../components/Toast/Toast";

const Pomoc = () => {
  const [toast, setToast] = useState(false);
  return (
    <div className="drawerContent">
      <div className="pomoc">
        <TextField
          id="filled-basic"
          label="Zadeva"
          sx={{ marginTop: 1, backgroundColor: "white" }}
        />
        <TextField
          id="filled-basic"
          label="Opis težave"
          multiline
          rows={10}
          sx={{ marginTop: 1, backgroundColor: "white" }}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 2, width: "10%" }}
          onClick={() => setToast(true)}
        >
          Pošlji
        </Button>
      </div>
      <Toast
        open={toast}
        closeToast={() => setToast(false)}
        severity="success"
        message="Uspešno poslano sporočilo"
      />
    </div>
  );
};

export default Pomoc;
