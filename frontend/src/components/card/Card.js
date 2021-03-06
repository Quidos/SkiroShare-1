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
import Badge from "@mui/material/Badge";
import { getPostaja, coordinatesDistance, dobiSliko } from "../../util/utils";
import { useNavigate } from "react-router-dom";

const Oglas = ({
  id = -1,
  title = "Skiro",
  description = "Elektricno skiro",
  btnText = "Najemi",
  razdalja = 0,
  oglasUporabnika = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [imageURL, setImageURL] = React.useState("");
  const [hasImage, setHasImage] = React.useState(false);
  const izbranOglas = useSelector(selectIzbranOglas);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const showDetails = () => {
    dispatch(setIzbranOglas(id));
    if (oglasUporabnika) return navigate(`/posodobiOglas/${id}`);

    setOpen(true);
  };

  React.useEffect(() => {
    let run = true;
    (async function () {
      const data = await dobiSliko(id);
      if (run && data.length > 0) {
        setImageURL(data);
        setHasImage(true);
      } else {
        setImageURL("");
        setHasImage(false);
      }
    })();
    return () => {
      run = false;
    };
  }, []);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "space-between",
      }}
    >
      <Card
        sx={{
          maxWidth: 345,
          ":hover": {
            boxShadow: 20, // theme.shadows[20]
          },
          display: "flex",
          flexDirection: "column",
          maxHeight: "100%",
        }}
      >
        <CardMedia
          component="img"
          image={!hasImage ? Skiro : null}
          src={hasImage ? imageURL : null}
          alt="Skiro"
          style={{ width: "100%", height: "70%" }}
        />

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            <Badge
              badgeContent={razdalja}
              color="primary"
              sx={{ width: "90%" }}
            >
              {title}
            </Badge>
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
        razdalja={razdalja}
        oglasUporabnika={oglasUporabnika}
      />
    </div>
  );
};

export default Oglas;
// postaja = "Ve??na Pot 113",
// cena = "0.13",
// najemoDajalec = "Janez Novak",
// kontakt = "051-245-621",
// naziv = "Skirca",
// opis = "Praesent commodo cursus magna, vel scelerisque nisl consectetur etVivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
