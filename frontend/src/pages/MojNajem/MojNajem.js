import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import { najemiUporabnika, zakljuciNajem } from "../../util/utils";
import DoneIcon from "@mui/icons-material/Done";
import Toast from "../../components/Toast/Toast";
import moment from "moment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";

const MojNajem = () => {
  const [oglasi, setOglasi] = useState([]);
  const [openToast, setOpenToast] = useState(false);

  useEffect(() => {
    let run = true;
    najemiUporabnika().then((data) => {
      if (run) setOglasi(data);
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
                await zakljuciNajem(params.row.id_skiro, params.row.id_najem);
                setOpenToast(true);
              }
            }}
          />,
        ];
      },
    },
  ];
  return (
    <div className="drawerContent">
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
        />
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
