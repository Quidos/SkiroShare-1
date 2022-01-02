// FILE FOR MOST COMMON FUNCTIONS
import API from "../config/config.js";
import { setUserToken } from "../redux/appSlice.js";
import { store } from "../redux/store.js";

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
export const zakljuciNajem = async (id_skiro, id_najem) => {
  return await API.postRequest(`/zakljuciSkiro`, { id_skiro, id_najem });
};
