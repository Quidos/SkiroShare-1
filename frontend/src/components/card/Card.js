import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Skiro from "./assets/skiro.png";
import CustomizedDialogs from "../OglasDialog/OglasDialog";
import { useDispatch, useSelector } from "react-redux";
import { selectIzbranOglas, setIzbranOglas } from "../../redux/appSlice";

const Oglas = ({
  id = -1,
  title = "Skiro",
  description = "Elektricno skiro",
  btnText = "Najemi",
}) => {
  const [open, setOpen] = React.useState(false);
  const izbranOglas = useSelector(selectIzbranOglas);
  const dispatch = useDispatch();
  const showDetails = () => {
    dispatch(setIzbranOglas(id));
    setOpen(true);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          ":hover": {
            boxShadow: 20, // theme.shadows[20]
          },
        }}
      >
        <CardMedia
          component="img"
          image={Skiro}
          alt="Skiro"
          style={{ width: "100%", height: "100%" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={showDetails}>
            {btnText}
          </Button>
        </CardActions>
      </Card>
      <CustomizedDialogs
        id={id}
        open={open}
        setOpen={setOpen}
        postaja={izbranOglas && izbranOglas.postaja}
        cena={izbranOglas && izbranOglas.cena}
        naziv={izbranOglas && izbranOglas.naziv}
        opis={izbranOglas && izbranOglas.opis}
      />
    </>
  );
};

export default Oglas;
// postaja = "Večna Pot 113",
// cena = "0.13",
// najemoDajalec = "Janez Novak",
// kontakt = "051-245-621",
// naziv = "Skirca",
// opis = "Praesent commodo cursus magna, vel scelerisque nisl consectetur etVivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
