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
  const searchQuery = useSelector(selectSearchQuery);
  const [vsiOglasi, setVsiOglasi] = useState([]);
  const [prvotniOglasi, setVsiPrvotniOglasi] = useState([]);

  // useEffect(() => {
  //   API.getRequest("/skiroji").then((data) => {
  //     setVsiOglasi(data);
  //   });
  // }, []);

  useEffect(() => {
    let run = true;
    if (searchQuery.length > 0) {
      let filteredOglasi = vsiOglasi.filter(({ naziv }) =>
        naziv.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (run) setVsiOglasi(filteredOglasi);
    } else {
      if (prvotniOglasi.length === 0) {
        API.getRequest("/skiroji").then((data) => {
          if (run) {
            setVsiPrvotniOglasi(data);
            setVsiOglasi(data);
          }
        });
      }
      if (run) setVsiOglasi(prvotniOglasi);
    }

    return () => {
      run = false;
    };
  }, [searchQuery]);
  return (
    <div className="drawerContent">
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        sx={{ borderColor: "red", borderWidth: 2, justifyContent: "center" }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {vsiOglasi.length === 0 && <Typography>Ni oglasov</Typography>}

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
