import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import { najemiUporabnika, zakljuciNajem } from "../../util/utils";
import Toast from "../../components/Toast/Toast";
import moment from "moment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import API from "../../config/config";

const MojNajem = () => {
  const [oglasi, setOglasi] = useState([]);
  const [openToast, setOpenToast] = useState(false);
  const [baterija, setBaterija] = useState("");
  const [postaja, setPostaja] = useState("");
  const [postaje, setPostaje] = useState([]);
  const [praznaPoljaError, setPraznaPoljaError] = useState([]);
  const [izbranoSkiro, setIzbranoSkiro] = useState(false);

  const zakljuciSkiro = async () => {
    if (!izbranoSkiro) return;
    setPraznaPoljaError([]);
    let prazna = [];
    if (baterija.length === 0) prazna.push(0);
    if (postaja.length === 0) prazna.push(1);
    if (prazna.length > 0) return setPraznaPoljaError(prazna);
    await zakljuciNajem(
      izbranoSkiro.id_skiro,
      izbranoSkiro.id_najem,
      izbranoSkiro.id_postaja,
      baterija
    );
    setOpenToast(true);
  };

  useEffect(() => {
    let run = true;
    najemiUporabnika().then((data) => {
      if (run) setOglasi(data);
    });
    API.getRequest("/postaje").then((data) => {
      if (run) setPostaje(data);
    });
    return () => {
      run = false;
    };
  }, [openToast]);

  const closeToast = () => {
    setOpenToast(false);
  };

  const columns = [
    { field: "id_najem", headerName: "ID", width: 90 },
    {
      field: "naziv_postaja",
      headerName: "Postaja",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "naziv",
      headerName: "Naziv",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "cena",
      headerName: "Cena na minuto",
      type: "number",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "baterija",
      headerName: "Baterija",
      type: "number",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "zacetek_najema",
      headerName: "Začetek Najema",
      flex: 1,
      minWidth: 150,
      editable: false,
      type: "dateTime",
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString();
      },
      valueGetter: (params) => {
        return new Date(params.value).toLocaleString();
      },
    },
    {
      field: "konec_najema",
      headerName: "Zaključek Najema",
      flex: 1,
      minWidth: 150,
      editable: false,
      type: "dateTime",
      valueFormatter: (params) => {
        if (params.value) return new Date(params.value).toLocaleString();
        return "";
      },
      valueGetter: (params) => {
        if (params.value) return new Date(params.value).toLocaleString();
        return "";
      },
    },
    {
      field: "",
      headerName: "Skupna cena",
      flex: 1,
      minWidth: 150,
      editable: false,
      type: "number",

      valueGetter: (params) => {
        if (params.row.konec_najema && params.row.zacetek_najema) {
          const difference = moment.duration(
            moment(params.row.konec_najema).diff(
              moment(params.row.zacetek_najema)
            )
          );
          const minutes = difference.asMinutes();
          const price = +(minutes * parseFloat(params.row.cena)).toFixed(2);
          return price;
        }
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Zaključi Najem",
      width: 100,
      getActions: (params) => {
        if (params.row.konec_najema && params.row.zacetek_najema) {
          return [
            <GridActionsCellItem
              icon={<CheckCircleIcon sx={{ color: "green" }} />}
              label="ZakljuciNajem"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<PauseCircleFilledIcon sx={{ color: "red" }} />}
            label="ZakljuciNajem"
            onClick={async (e) => {
              if (!params.row.konec_najema) {
                // await zakljuciNajem(params.row.id_skiro, params.row.id_najem);
                // setOpenToast(true);
              }
            }}
          />,
        ];
      },
    },
  ];
  return (
    <div className="drawerContent">
      <div className="mojiNajemiWrapper">
        <div style={{ width: "100%" }}>
          <DataGrid
            rows={oglasi}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            hideFooter={true}
            autoHeight={true}
            getRowId={(row) => row.id_najem}
            sx={{ backgroundColor: "white" }}
            onSelectionModelChange={(ids) => {
              const selectedRowData = oglasi.filter((row) => {
                return ids[0] === row.id_najem;
              });
              setIzbranoSkiro(selectedRowData[0]);
              // console.log(selectedIDs);
            }}
          />
        </div>
        {izbranoSkiro && !izbranoSkiro.konec_najema && (
          <div className="mojiNajemiEdit">
            <Typography style={{ fontWeight: 600, marginBottom: 4 }}>
              {"Zaključi najem: " + izbranoSkiro.naziv}
            </Typography>
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
              error={praznaPoljaError.includes(0)}
              helperText={
                praznaPoljaError.includes(0) && "Prosimo vnesite polje"
              }
              value={baterija}
              onChange={(e) => {
                try {
                  var value = parseInt(e.target.value, 10);

                  if (value > 100) value = 100;
                  if (value < 0) value = 0;

                  setBaterija(value);
                } catch (error) {}
              }}
            />
            <FormControl
              fullWidth
              required
              sx={{ marginTop: 1, backgroundColor: "white" }}
              error={praznaPoljaError.includes(1)}
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
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={zakljuciSkiro}
            >
              Zakljuci Najem
            </Button>
          </div>
        )}
      </div>
      <Toast
        open={openToast}
        closeToast={closeToast}
        message="Uspešen zaključek najema"
      />
    </div>
  );
};

export default MojNajem;
