import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    oglasiUporabnika: JSON.parse(localStorage.getItem("MojiOglasi")) || [],
    izbranOglas: null,
    searchQuery: "",
    token: localStorage.getItem("token") || false,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addOglasUporabnika: (state, action) => {
      state.oglasiUporabnika = [...state.oglasiUporabnika, action.payload];
      let oglasi = JSON.parse(localStorage.getItem("MojiOglasi")) || [];
      oglasi.push(action.payload);
      localStorage.setItem("MojiOglasi", JSON.stringify(oglasi));
    },
    removeOglasUporabnika: (state, action) => {
      state.oglasiUporabnika = state.oglasiUporabnika.filter(
        ({ id }) => id !== action.payload
      );
      let oglasi = JSON.parse(localStorage.getItem("MojiOglasi")) || [];
      let novi = oglasi.filter(({ id }) => id !== action.payload);
      localStorage.setItem("MojiOglasi", JSON.stringify(novi));
    },

    setIzbranOglas: (state, action) => {
      let izbran = state.oglasiUporabnika.filter(
        ({ id }) => id === action.payload
      );
      state.izbranOglas = izbran[0] || {};
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
  },
});

export const {
  addOglasUporabnika,
  removeOglasUporabnika,
  setIzbranOglas,
  setSearchQuery,
  setUserToken,
} = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOglasiUporabnika = (state) => {
  return (
    JSON.parse(localStorage.getItem("MojiOglasi")) || state.app.oglasiUporabnika
  );
};

export const selectIzbranOglas = (state) => state.app.izbranOglas;
export const selectSearchQuery = (state) => state.app.searchQuery;
export const selectUserToken = (state) => state.app.token;

export default appSlice.reducer;
