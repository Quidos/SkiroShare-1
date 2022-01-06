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
  const [errorRaised, setErrorRaised] = useState("");
  const [praznaPoljaError, setPraznaPoljaError] = useState([]);

  const signIn = async () => {
    try {
      setPraznaPoljaError([]);
      setErrorRaised("");
      let prazna = [];
      if (username.length === 0) prazna.push(0);
      if (password.length === 0) prazna.push(1);
      if (prazna.length > 0) return setPraznaPoljaError(prazna);

      if (username.length > 0 && password.length > 0) {
        const data = await loginUser(username, password);
        if (data) {
          navigate("/");
        }
      }
    } catch (error) {
      if (error.response.status === 403) {
        setErrorRaised("Napačno uporabniško ime ali geslo.");
      } else {
        setErrorRaised("Napaka serverja.");
      }
    }
  };

  const onKeyDown = async (e) => {
    if (e.key === "Enter") await signIn();
  };

  const onChangeUsername = async (e) => {
    setErrorRaised("");
    setPraznaPoljaError(praznaPoljaError.filter((prazno) => prazno !== 0));
    setUsername(e.target.value);
  };
  const onChangePassword = async (e) => {
    setErrorRaised("");
    setPraznaPoljaError(praznaPoljaError.filter((prazno) => prazno !== 1));
    setPassword(e.target.value);
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
          {errorRaised.length > 0 && (
            <>
              <Typography color={"error"} sx={{ marginTop: 2 }}>
                {errorRaised}
              </Typography>
            </>
          )}

          <TextField
            label="Uporabniško Ime"
            placeholder="Vnesite uporabniško ime"
            fullWidth
            required
            value={username}
            sx={{ marginTop: 2 }}
            onChange={onChangeUsername}
            error={praznaPoljaError.includes(0)}
            helperText={praznaPoljaError.includes(0) && "Prosimo vnesite polje"}
          />
          <TextField
            label="Geslo"
            placeholder="Vnesite geslo"
            type="password"
            fullWidth
            required
            sx={{ marginTop: 2 }}
            value={password}
            onChange={onChangePassword}
            onKeyDown={onKeyDown}
            error={praznaPoljaError.includes(1)}
            helperText={praznaPoljaError.includes(1) && "Prosimo vnesite polje"}
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
          {/* <Typography>
            <Link href="#">Ste pozabili geslo?</Link>
          </Typography> */}
          <Typography>
            Še nimate računa? <Link href="/register">Registrirajte se</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
