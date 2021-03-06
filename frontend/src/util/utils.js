// FILE FOR MOST COMMON FUNCTIONS
import API, { BACKEND_URL } from "../config/config.js";
import * as geolib from "geolib";
import { setUserToken } from "../redux/appSlice.js";
import { store } from "../redux/store.js";
import axios from "axios";

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const getSkiro = async (id) => {
  return await API.getRequest(`/skiro/${id}`);
};
export const getNajem = async (id) => {
  return await API.getRequest(`/najem/${id}`);
};
export const getPostaja = async (id) => {
  return await API.getRequest(`/postaja/${id}`);
};
export const getUporabnik = async (id) => {
  return await API.getRequest(`/uporabnik/${id}`);
};

export const loginUser = async (username, password) => {
  const data = await API.postRequest(`/login`, {
    uporabnisko_ime: username,
    geslo: password,
  });
  if (data.token) {
    store.dispatch(setUserToken(data.token));
    return true;
  }
  return false;
};

export const registerUser = async (
  email,
  telefonska_stevilka,
  uporabnisko_ime,
  geslo
) => {
  // email, telefonska_stevilka, uporabnisko_ime, geslo
  const data = await API.postRequest(`/register`, {
    email,
    telefonska_stevilka,
    uporabnisko_ime,
    geslo,
  });
  if (data === "OK") {
    return true;
  }
  return false;
};
// uporabnikToken

export const userByToken = async () => {
  const data = await API.getRequest("/uporabnikToken");
  if (data.username) return data.username;

  return false;
};
export const logoutUser = () => {
  store.dispatch(setUserToken(null));
};

// SKIROJI OD TRENUTNO PRIJAVLJENEGA UPORABNIKA
export const oglasiUporabnika = async () => {
  return await API.getRequest("/skirojiUporabnik");
};

// NAJEMI OD TRENUTNO PRIJAVLJENEGA UPORABNIKA
export const najemiUporabnika = async () => {
  return await API.getRequest("/najemiUporabnik");
};

// USTVARI NAJEM
export const najemiSkiro = async (id_skiro, id_postaja) => {
  return await API.postRequest("/najem", { id_skiro, id_postaja });
};

// ZAKLUCI NAJEM
export const zakljuciNajem = async (
  id_skiro,
  id_najem,
  id_postaja,
  baterija
) => {
  return await API.postRequest(`/zakljuciSkiro`, {
    id_skiro,
    id_najem,
    id_postaja,
    baterija,
  });
};

// DOBI RAZDALJO OD TRENUTNE LOKACIJE DO DOLOCENIH KOORDINAT V METRIH
export const coordinatesDistance = (lat, lng) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distanceMeters = geolib.getDistance(
          { latitude, longitude },
          {
            latitude: lat,
            longitude: lng,
          }
        );
        resolve(parseInt(parseInt(distanceMeters / 1000).toFixed(2)));
      },
      () => {
        // alert("Position could not be determined.");
        resolve(false);
      }
    );
  });
};

// NALOZI SLIKO SKIROJA
export const naloziSliko = async (id_skiro, file) => {
  if (!file) return;
  const formData = new FormData();
  formData.append("File", file);
  await axios.post(`${BACKEND_URL}upload/${id_skiro}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token") || "",
    },
  });
};

export const dobiSliko = async (id_skiro) => {
  try {
    const res = await axios.get(`${BACKEND_URL}slika/${id_skiro}`, {
      responseType: "arraybuffer",
    });
    if (res.statusText === "without image") return "";
    const imgFile = new Blob([res.data]);
    const imgUrl = URL.createObjectURL(imgFile);
    return imgUrl;
  } catch (error) {
    return "";
  }
};

// DOBI PODATKE UPORABNIKA
export const getUser = async () => {
  return await API.getRequest(`/uporabnikPodatki`);
};

// POSODOBI PODATKE UPORABNIKA
export const updateUser = async (data) => {
  return await API.postRequest(`/uporabnikUpdate`, data);
};
