import {
  Box,
  CircularProgress,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
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
import { coordinatesDistance, getPostaja } from "../../util/utils";

const Domov = () => {
  const searchQuery = useSelector(selectSearchQuery);
  const [vsiOglasi, setVsiOglasi] = useState([]);
  const [prvotniOglasi, setVsiPrvotniOglasi] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   API.getRequest("/skiroji").then((data) => {
  //     setVsiOglasi(data);
  //   });
  // }, []);

  const addDistances = async (data) => {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const { koordinate } = await getPostaja(element.id_postaja);
      element.razdalja = await coordinatesDistance(koordinate.x, koordinate.y);
      if (!element.razdalja) element.razdalja = 0;
      newData.push(element);
    }
    newData.sort((a, b) => parseFloat(a.razdalja) - parseFloat(b.razdalja));
    return newData;
  };

  useEffect(() => {
    let run = true;
    setLoading(true);
    if (searchQuery.length > 0) {
      let filteredOglasi = vsiOglasi.filter(({ naziv }) =>
        naziv.toLowerCase().includes(searchQuery.toLowerCase())
      );
      filteredOglasi.sort(
        (a, b) => parseFloat(a.razdalja) - parseFloat(b.razdalja)
      );
      if (run) {
        setVsiOglasi(filteredOglasi);
        setLoading(false);
      }
    } else {
      if (prvotniOglasi.length === 0) {
        (async function () {
          const data = await API.getRequest("/skiroji");
          const newData = await addDistances(data);
          if (run) {
            setVsiPrvotniOglasi(newData);
            setVsiOglasi(newData);
            setLoading(false);
          }
        })();
      } else if (run) {
        setVsiOglasi(prvotniOglasi);
        setLoading(false);
      }
    }

    return () => {
      run = false;
    };
  }, [searchQuery]);

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
        sx={{ height: "100%" }}
        // direction="row"
        // justifyContent="center"
        // alignItems="center"
        // alignItems="stretch"
      >
        {vsiOglasi.map((data) => (
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            key={data.id_skiro}
            sx={{ height: "60%", minHeight: 500, minWidth: 300 }}
          >
            <Oglas
              id={data.id_skiro}
              title={data.naziv}
              description={data.opis}
              razdalja={data.razdalja === 0 ? 0 : data.razdalja + " km"}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Domov;
