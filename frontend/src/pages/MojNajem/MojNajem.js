import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import { najemiUporabnika, zakljuciNajem } from "../../util/utils";
import DoneIcon from "@mui/icons-material/Done";
import Toast from "../../components/Toast/Toast";

const MojNajem = () => {
  const [oglasi, setOglasi] = useState([]);
  const [openToast, setOpenToast] = useState(false);

  useEffect(() => {
    najemiUporabnika().then((data) => setOglasi(data));
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
      editable: true,
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
      field: "actions",
      type: "actions",
      headerName: "Zaključi Najem",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DoneIcon />}
          label="ZakljuciNajem"
          onClick={async (e) => {
            if (!params.row.konec_najema) {
              await zakljuciNajem(params.row.id_skiro, params.row.id_najem);
              setOpenToast(true);
            }
          }}
        />,
      ],
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
