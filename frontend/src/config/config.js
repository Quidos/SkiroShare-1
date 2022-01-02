import axios from "axios";
import { useSelector } from "react-redux";
import { selectUserToken, setUserToken } from "../redux/appSlice";
import { store } from "../redux/store.js";

export const BACKEND_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:4000/" : "";

const customAxios = axios.create({
  baseURL: BACKEND_URL,
});

// Add a response interceptor
customAxios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status == 403 || error.response.status == 401) {
      store.dispatch(setUserToken(null));
    }
    return Promise.reject(error);
  }
);

const API = {
  getRequest: async (route) => {
    const { data } = await customAxios.get(route, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token") || "",
      },
    });
    return data;
  },

  postRequest: async (route, body) => {
    const { data } = await customAxios.post(route, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token") || "",
      },
    });
    return data;
  },

  deleteRequest: async (route) => {
    const { data } = await customAxios.delete(route, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token") || "",
      },
    });
    return data;
  },
};

export default API;
