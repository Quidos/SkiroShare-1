import { Box, Grid, Toolbar } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Oglas from "../../components/card/Card";
import { selectOglasiUporabnika } from "../../redux/appSlice";

const Domov = () => {
  const oglasi = useSelector(selectOglasiUporabnika);
  useEffect(() => {
    // console.log("DATUM", moment.locale());
  }, []);
  return (
    <div className="drawerContent">
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        sx={{ borderColor: "red", borderWidth: 2, justifyContent: "center" }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {/* {Array.from(Array(6)).map((_, index) => (
          <Grid item key={index} sm={4} md={4}>
            <Oglas />
          </Grid>
        ))} */}

        {Array.from(Array(6)).map((_, index) => (
          <Grid item key={index} sm={4} md={4}>
            <Oglas />
          </Grid>
        ))}
        {oglasi.map((data) => (
          <Grid item key={data.id} sm={4} md={4}>
            <Oglas id={data.id} title={data.naziv} description={data.opis} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Domov;
