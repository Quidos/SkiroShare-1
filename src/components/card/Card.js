import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Skiro from "./assets/skiro.png";
import CustomizedDialogs from "../OglasDialog/OglasDialog";

const Oglas = ({
  id = 0,
  title = "Skiro",
  description = "Elektricno skiro",
  btnText = "Oglej",
}) => {
  const [open, setOpen] = React.useState(false);
  const showDetails = () => {
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
      <CustomizedDialogs open={open} setOpen={setOpen} />
    </>
  );
};

export default Oglas;
