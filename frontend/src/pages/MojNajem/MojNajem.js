import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import { najemiUporabnika, zakljuciNajem } from "../../util/utils";
import DoneIcon from "@mui/icons-material/Done";

const MojNajem = () => {
  const [oglasi, setOglasi] = useState([]);

  useEffect(() => {
    najemiUporabnika().then((data) => setOglasi(data));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
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
            console.log(params);
            if (!params.row.konec_najema) {
              await zakljuciNajem(params.row.id_skiro, params.row.id_najem);
            }
            // await zakljuciNajem(params.id);
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
    </div>
  );
};

export default MojNajem;
