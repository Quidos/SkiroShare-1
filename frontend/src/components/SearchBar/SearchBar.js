import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { selectOglasiUporabnika, setSearchQuery } from "../../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import API from "../../config/config";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");

  const [vsiOglasi, setVsiOglasi] = React.useState([]);

  React.useEffect(() => {
    API.getRequest("/skiroji").then((data) => {
      setVsiOglasi(data);
    });
  }, []);
  return (
    <Autocomplete
      freeSolo
      id="combo-box-demo"
      disableClearable
      options={vsiOglasi}
      sx={{ width: 300 }}
      getOptionLabel={(option) => option.naziv}
      onChange={(e, newval, reason) => {
        // console.log({ e, newval, reason });
        dispatch(setSearchQuery(newval.naziv));
      }}
      renderInput={(params) => (
        <div className="searchBar">
          <TextField
            {...params}
            label="Išči Oglase"
            variant="standard"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
            sx={{ backgroundColor: "white" }}
            onChange={(e) => {
              // if (e.code === "enter" && e.target.value) {
              //   alert("ENTER");
              // }
              setTimeout(() => {
                dispatch(setSearchQuery(e.target.value));
              }, 500);
              // setValue(e.target.value);
            }}
          />
          {/* <IconButton
            onClick={() => {
              dispatch(setSearchQuery(value));
            }}
          >
            <SearchIcon />
          </IconButton> */}
        </div>
      )}
    />
  );
};
export default SearchBar;
