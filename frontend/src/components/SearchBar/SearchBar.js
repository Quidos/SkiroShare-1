import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { selectOglasiUporabnika, setSearchQuery } from "../../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const OGLASI = useSelector(selectOglasiUporabnika);
  const dispatch = useDispatch();
  return (
    <Autocomplete
      freeSolo
      id="combo-box-demo"
      disableClearable
      options={OGLASI}
      sx={{ width: 300 }}
      getOptionLabel={(option) => option.naziv}
      onChange={(e, newval, reason) => {
        console.log({ e, newval, reason });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Išči Oglase"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
          sx={{ backgroundColor: "white" }}
          onChange={(e) => {
            if (e.code === "enter" && e.target.value) {
              alert("ENTER");
            }
            dispatch(setSearchQuery(e.target.value));
          }}
        />
      )}
    />
  );
};
export default SearchBar;
