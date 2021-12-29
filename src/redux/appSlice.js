import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    oglasiUporabnika: [],
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
  },
});

export const { addOglasUporabnika, removeOglasUporabnika } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOglasiUporabnika = (state) => {
  return (
    JSON.parse(localStorage.getItem("MojiOglasi")) || state.app.oglasiUporabnika
  );
};

export default appSlice.reducer;
