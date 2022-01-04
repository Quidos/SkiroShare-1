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
import { registerUser } from "../../util/utils";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const paperStyle = {
    padding: 20,
    height: "60%",
    width: 400,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const register = async () => {
    // email, telefonska_stevilka, uporabnisko_ime, geslo
    const data = await registerUser(email, number, username, password);
    if (data) return navigate("/");
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
            label="Email"
            placeholder="Vnesite Email"
            fullWidth
            required
            sx={{ marginTop: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Telefonska Stevilka"
            placeholder="Vnesite Telefonsko Številko"
            fullWidth
            required
            sx={{ marginTop: 2 }}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <TextField
            label="Uporabniško ime"
            placeholder="Vnesite uporabniško ime"
            fullWidth
            required
            sx={{ marginTop: 2 }}
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
          <TextField
            label="Ponovno geslo"
            placeholder="Vnesite geslo ponovno"
            type="password"
            fullWidth
            required
            sx={{ marginTop: 2 }}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={register}
          >
            Registracija
          </Button>

          <Typography>
            Že imate račun? <Link href="/login">Prijava</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Register;
