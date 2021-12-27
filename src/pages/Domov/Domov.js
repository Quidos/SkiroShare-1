import { Box, Grid, Toolbar } from "@mui/material";
import React from "react";
import Oglas from "../../components/card/Card";

const Domov = () => {
  return (
    <div className="drawerContent">
      <Grid
        container
        spacing={{ xs: 2, md: 5 }}
        sx={{ borderColor: "red", borderWidth: 2, justifyContent: "center" }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid item key={index}>
            <Oglas />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Domov;
