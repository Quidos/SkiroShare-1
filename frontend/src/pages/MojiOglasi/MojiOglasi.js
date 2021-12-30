import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectOglasiUporabnika } from "../../redux/appSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { removeOglasUporabnika } from "../../redux/appSlice";

const MojiOglasi = () => {
  const oglasi = useSelector(selectOglasiUporabnika);
  const dispatch = useDispatch();
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "naziv",
      headerName: "Naziv",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "postaja",
      headerName: "Postaja",
      flex: 1,
      minWidth: 150,
      editable: true,
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
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "objavljeno",
      headerName: "Datum Objave",
      flex: 1,
      minWidth: 150,
      editable: false,
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
        />
      </div>
    </div>
  );
};

export default MojiOglasi;
