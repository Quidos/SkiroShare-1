import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainDrawer from "./components/drawer/MainDrawer";
import Domov from "./pages/Domov/Domov";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import MojiOglasi from "./pages/MojiOglasi/MojiOglasi";
import Nastavitve from "./pages/Nastavitve/Nastavitve";
import ObjaviOglas from "./pages/ObjaviOglas/ObjaviOglas";
import Pomoc from "./pages/Pomoc/Pomoc";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MojNajem from "./pages/MojNajem/MojNajem";
import { selectUserToken } from "./redux/appSlice";
import { useSelector } from "react-redux";

function App() {
  let location = useLocation();
  const [showDrawer, setShowDrawer] = useState(true);
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setShowDrawer(false);
    } else {
      setShowDrawer(true);
    }
  }, [location]);
  return (
    <div className="App">
      {showDrawer && <MainDrawer />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <RequireAuth redirectTo="/login">
              <Domov />
            </RequireAuth>
          }
        />
        <Route
          path="/objavi"
          element={
            <RequireAuth redirectTo="/login">
              <ObjaviOglas />
            </RequireAuth>
          }
        />
        <Route
          path="/pomoc"
          element={
            <RequireAuth redirectTo="/login">
              <Pomoc />
            </RequireAuth>
          }
        />
        <Route
          path="/nastavitve"
          element={
            <RequireAuth redirectTo="/login">
              <Nastavitve />
            </RequireAuth>
          }
        />
        <Route
          path="/mojiOglasi"
          element={
            <RequireAuth redirectTo="/login">
              <MojiOglasi />
            </RequireAuth>
          }
        />
        <Route
          path="/mojNajem"
          element={
            <RequireAuth redirectTo="/login">
              <MojNajem />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = useSelector(selectUserToken);
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default App;
