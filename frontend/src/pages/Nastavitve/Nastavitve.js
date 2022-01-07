import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast/Toast";
import { setUserToken } from "../../redux/appSlice";
import { getUser, updateUser, validateEmail } from "../../util/utils";

const Nastavitve = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [praznaPoljaError, setPraznaPoljaError] = useState([]);
  const [errorRaised, setErrorRaised] = useState("");
  const [newPassword, setNewPassword] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toast, setToast] = useState({
    severity: "success",
    message: "Uspešno posodobljeni podatki",
  });

  const dispatch = useDispatch();

  const closeToast = () => setOpenToast(false);

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

  const addNewPassword = async (e) => {
    setNewPassword(!newPassword);
  };

  const updateUserFetch = async () => {
    setErrorRaised("");
    let prazna = [];
    if (email.length === 0) prazna.push(0);
    if (number.length === 0) prazna.push(1);
    if (username.length === 0) prazna.push(2);
    if (newPassword && password.length === 0) prazna.push(3);
    if (newPassword && secondPassword.length === 0) prazna.push(4);

    if (prazna.length > 0) return setPraznaPoljaError(prazna);

    if (!validateEmail(email))
      return setErrorRaised("Neveljavevn Email naslov!");

    if (newPassword && password !== secondPassword)
      return setErrorRaised("Gesli se ne ujemata!");

    try {
      await updateUser({
        email: email,
        telefonska_stevilka: number,
        uporabnisko_ime: username,
        geslo: newPassword ? password : null,
      });
      setOpenToast(true);
      setTimeout(() => {
        dispatch(setUserToken(null));
      }, 1000);
    } catch (error) {
      setToast({
        severity: "error",
        message: "Napaka pri posodobitvi podatkov",
      });
      setOpenToast(true);
    }
  };

  useEffect(() => {
    let run = true;
    getUser().then((data) => {
      if (run) {
        setEmail(data.email);
        setNumber(data.telefonska_stevilka);
        setUsername(data.uporabnisko_ime);
      }
    });

    return () => {
      run = false;
    };
  }, []);
  return (
    <div className="drawerContent">
      <div className="nastavitveWrapper">
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
          value={email}
          onChange={onChangeEmail}
          error={praznaPoljaError.includes(0)}
          helperText={praznaPoljaError.includes(0) && "Prosimo vnesite polje"}
          sx={{ backgroundColor: "white", marginTop: 2 }}
        />
        <TextField
          label="Telefonska Stevilka"
          placeholder="Vnesite Telefonsko Številko"
          fullWidth
          value={number}
          onChange={onChangeNumber}
          error={praznaPoljaError.includes(1)}
          helperText={praznaPoljaError.includes(1) && "Prosimo vnesite polje"}
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          sx={{ backgroundColor: "white", marginTop: 2, marginTop: 2 }}
        />
        <TextField
          label="Uporabniško ime"
          placeholder="Vnesite uporabniško ime"
          fullWidth
          value={username}
          onChange={onChangeUsername}
          error={praznaPoljaError.includes(2)}
          helperText={praznaPoljaError.includes(2) && "Prosimo vnesite polje"}
          sx={{ backgroundColor: "white", marginTop: 2 }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ marginTop: 2, marginBottom: 2 }}
          onClick={addNewPassword}
        >
          Novo Geslo
        </Button>
        {newPassword && (
          <div>
            <TextField
              label="Geslo"
              placeholder="Vnesite geslo"
              type="password"
              fullWidth
              value={password}
              onChange={onChangePassword}
              error={praznaPoljaError.includes(3)}
              helperText={
                praznaPoljaError.includes(3) && "Prosimo vnesite polje"
              }
              sx={{ backgroundColor: "white", marginTop: 2 }}
            />
            <TextField
              label="Ponovno geslo"
              placeholder="Vnesite geslo ponovno"
              type="password"
              fullWidth
              value={secondPassword}
              sx={{ marginTop: 2, marginBottom: 2 }}
              onChange={onChangeSecondPassword}
              error={praznaPoljaError.includes(4)}
              helperText={
                praznaPoljaError.includes(4) && "Prosimo vnesite polje"
              }
              sx={{ backgroundColor: "white", marginTop: 2, marginBottom: 2 }}
            />
          </div>
        )}

        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          onClick={updateUserFetch}
        >
          Posodobi
        </Button>
      </div>
      <Toast
        open={openToast}
        closeToast={closeToast}
        severity={toast.severity}
        message={toast.message}
      />
    </div>
  );
};

export default Nastavitve;
