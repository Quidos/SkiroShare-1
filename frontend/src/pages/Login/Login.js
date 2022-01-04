import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../util/utils";

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "60%",
    width: 400,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    if (username.length > 0 && password.length > 0) {
      const data = await loginUser(username, password);
      if (data) {
        navigate("/");
      }
    }
  };

  return (
    <div className="login-wrapper">
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Skiro Share</h2>
          </Grid>
          <TextField
            label="Uporabniško Ime"
            placeholder="Vnesite uporabniško ime"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Geslo"
            placeholder="Vnesite geslo"
            type="password"
            fullWidth
            required
            sx={{ marginTop: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Zapomni me se"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={signIn}
          >
            Prijava
          </Button>
          <Typography>
            <Link href="#">Ste pozabili geslo?</Link>
          </Typography>
          <Typography>
            Še nimate računa? <Link href="/register">Registrirajte se</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
