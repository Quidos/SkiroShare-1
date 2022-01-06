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
import { registerUser, validateEmail } from "../../util/utils";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [praznaPoljaError, setPraznaPoljaError] = useState([]);
  const [errorRaised, setErrorRaised] = useState("");

  const paperStyle = {
    padding: 20,
    height: "60%",
    width: 400,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const register = async () => {
    setErrorRaised("");
    let prazna = [];
    if (email.length === 0) prazna.push(0);
    if (number.length === 0) prazna.push(1);
    if (username.length === 0) prazna.push(2);
    if (password.length === 0) prazna.push(3);
    if (secondPassword.length === 0) prazna.push(4);

    if (prazna.length > 0) return setPraznaPoljaError(prazna);

    if (!validateEmail(email))
      return setErrorRaised("Neveljavevn Email naslov!");

    if (password !== secondPassword)
      return setErrorRaised("Gesli se ne ujemata!");

    const data = await registerUser(email, number, username, password);
    if (data) return navigate("/");
  };

  const onChangeEmail = async (e) => {
    setErrorRaised("");
    setPraznaPoljaError(praznaPoljaError.filter((prazno) => prazno !== 0));
    setEmail(e.target.value);
  };
  const onChangeNumber = async (e) => {
    setErrorRaised("");
    setPraznaPoljaError(praznaPoljaError.filter((prazno) => prazno !== 1));
    setNumber(e.target.value);
  };

  const onChangeUsername = async (e) => {
    setErrorRaised("");
    setPraznaPoljaError(praznaPoljaError.filter((prazno) => prazno !== 2));
    setUsername(e.target.value);
  };
  const onChangePassword = async (e) => {
    setErrorRaised("");
    setPraznaPoljaError(praznaPoljaError.filter((prazno) => prazno !== 3));
    setPassword(e.target.value);
  };
  const onChangeSecondPassword = async (e) => {
    setErrorRaised("");
    setPraznaPoljaError(praznaPoljaError.filter((prazno) => prazno !== 4));
    setSecondPassword(e.target.value);
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
            label="Email"
            placeholder="Vnesite Email"
            fullWidth
            required
            sx={{ marginTop: 2 }}
            value={email}
            onChange={onChangeEmail}
            error={praznaPoljaError.includes(0)}
            helperText={praznaPoljaError.includes(0) && "Prosimo vnesite polje"}
          />
          <TextField
            label="Telefonska Stevilka"
            placeholder="Vnesite Telefonsko Številko"
            fullWidth
            required
            sx={{ marginTop: 2 }}
            value={number}
            onChange={onChangeNumber}
            error={praznaPoljaError.includes(1)}
            helperText={praznaPoljaError.includes(1) && "Prosimo vnesite polje"}
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <TextField
            label="Uporabniško ime"
            placeholder="Vnesite uporabniško ime"
            fullWidth
            required
            sx={{ marginTop: 2 }}
            value={username}
            onChange={onChangeUsername}
            error={praznaPoljaError.includes(2)}
            helperText={praznaPoljaError.includes(2) && "Prosimo vnesite polje"}
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
            error={praznaPoljaError.includes(3)}
            helperText={praznaPoljaError.includes(3) && "Prosimo vnesite polje"}
          />
          <TextField
            label="Ponovno geslo"
            placeholder="Vnesite geslo ponovno"
            type="password"
            fullWidth
            required
            value={secondPassword}
            sx={{ marginTop: 2, marginBottom: 2 }}
            onChange={onChangeSecondPassword}
            error={praznaPoljaError.includes(4)}
            helperText={praznaPoljaError.includes(4) && "Prosimo vnesite polje"}
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

          <Typography sx={{ marginTop: 2 }}>
            Že imate račun? <Link href="/login">Prijava</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Register;
