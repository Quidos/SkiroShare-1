import { Box, Grid, Toolbar, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Oglas from "../../components/card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";
import API from "../../config/config";
import {
  selectOglasiUporabnika,
  selectSearchQuery,
} from "../../redux/appSlice";

const Domov = () => {
  const oglasi = useSelector(selectOglasiUporabnika);
  const searchQuery = useSelector(selectSearchQuery);
  const [currentOglasi, setCurrentOglasi] = useState(oglasi);
  const [vsiOglasi, setVsiOglasi] = useState([]);

  useEffect(() => {
    API.getRequest("/skiroji").then((data) => {
      setVsiOglasi(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    // console.log("DATUM", moment.locale());
    if (searchQuery.length > 0) {
      let filteredOglasi = oglasi.filter(({ naziv }) =>
        naziv.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCurrentOglasi(filteredOglasi);
    } else {
      setCurrentOglasi(oglasi);
    }
  }, [searchQuery]);
  return (
    <div className="drawerContent">
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        sx={{ borderColor: "red", borderWidth: 2, justifyContent: "center" }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {currentOglasi.length === 0 && <Typography>Ni oglasov</Typography>}
        {/* {currentOglasi.map((data) => (
          <Grid item key={data.id} sm={4} md={4}>
            <Oglas id={data.id} title={data.naziv} description={data.opis} />
          </Grid>
        ))} */}

        {vsiOglasi.map((data) => (
          <Grid item key={data.id_skiro} sm={4} md={4}>
            <Oglas
              id={data.id_skiro}
              title={data.naziv}
              description={data.opis}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Domov;
