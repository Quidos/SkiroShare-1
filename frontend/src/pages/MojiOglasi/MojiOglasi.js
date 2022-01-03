import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectOglasiUporabnika } from "../../redux/appSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { removeOglasUporabnika } from "../../redux/appSlice";
import { oglasiUporabnika } from "../../util/utils";

const MojiOglasi = () => {
  // const oglasi = useSelector(selectOglasiUporabnika);
  const dispatch = useDispatch();
  const [oglasi, setOglasi] = useState([]);

  useEffect(() => {
    let run = true;
    oglasiUporabnika().then((data) => {
      if (run) setOglasi(data);
    });
    return () => {
      run = false;
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
          getRowId={(row) => row.id_skiro}
        />
      </div>
    </div>
  );
};

export default MojiOglasi;
