import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectOglasiUporabnika } from "../../redux/appSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { removeOglasUporabnika } from "../../redux/appSlice";
import { oglasiUporabnika } from "../../util/utils";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import Oglas from "../../components/card/Card";

const MojiOglasi = () => {
  // const oglasi = useSelector(selectOglasiUporabnika);
  const dispatch = useDispatch();
  const [oglasi, setOglasi] = useState([]);
  const [vsiOglasi, setVsiOglasi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let run = true;
    setLoading(true);
    oglasiUporabnika().then((data) => {
      if (run) setVsiOglasi(data);
      setLoading(false);
    });
    return () => {
      run = false;
      setLoading(false);
    };
  }, []);
  const columns = [
    { field: "id_skiro", headerName: "ID", width: 90 },
    {
      field: "naziv_postaja",
      headerName: "Postaja",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "naziv",
      headerName: "Naziv",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "opis",
      headerName: "Opis",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "cena",
      headerName: "Cena",
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
      field: "v_najemu",
      headerName: "V najemu",
      flex: 1,
      minWidth: 150,
      editable: false,
      valueFormatter: (params) => {
        return params.value;
      },
      // valueGetter for filtering
      valueGetter: (params) => {
        if (params.value) return "DA";
        return "NE";
      },
    },
    {
      field: "objavljen_ob",
      headerName: "Datum Objave",
      flex: 1,
      minWidth: 250,
      editable: false,
      type: "dateTime",
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString();
      },
      // valueGetter for filtering
      valueGetter: (params) => {
        return new Date(params.value).toLocaleString();
      },
    },
    {
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={(e) => {
            console.log(params);
            dispatch(removeOglasUporabnika(params.id));
          }}
        />,
      ],
    },
  ];
  // return (
  //   <div className="drawerContent">
  //     <div style={{ width: "100%" }}>
  //       <DataGrid
  //         rows={oglasi}
  //         columns={columns}
  //         checkboxSelection
  //         disableSelectionOnClick
  //         hideFooter={true}
  //         autoHeight={true}
  //         getRowId={(row) => row.id_skiro}
  //       />
  //     </div>
  //   </div>
  // );

  if (loading) {
    return (
      <div className="drawerContentLoading">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (!loading && vsiOglasi.length === 0) {
    return (
      <div className="drawerContentLoading">
        <Typography style={{ fontWeight: 600 }}>Ni Oglasov</Typography>
      </div>
    );
  }

  return (
    <div className="drawerContent">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        // direction="row"
        // justifyContent="center"
        // alignItems="center"
      >
        {/* {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Oglas
              id={data.id_skiro}
              title={data.naziv}
              description={data.opis}
              razdalja={data.razdalja + " km"}
            />
          </Grid>
        ))} */}
        {vsiOglasi.length === 0 && <Typography>Ni oglasov</Typography>}
        {vsiOglasi.map((data) => (
          <Grid item xs={2} sm={4} md={4} key={data.id_skiro}>
            <Oglas
              id={data.id_skiro}
              title={data.naziv}
              description={data.opis}
              // razdalja={data.razdalja === 0 ? 0 : data.razdalja + " km"}
              oglasUporabnika={true}
              btnText="Posodobi"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MojiOglasi;
