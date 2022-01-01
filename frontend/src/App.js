import { Route, Routes } from "react-router-dom";
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
        <Route path="/" element={<Domov />} />
        <Route path="/objavi" element={<ObjaviOglas />} />
        <Route path="/pomoc" element={<Pomoc />} />
        <Route path="/nastavitve" element={<Nastavitve />} />
        <Route path="/mojiOglasi" element={<MojiOglasi />} />
        <Route path="/mojNajem" element={<MojNajem />} />
      </Routes>
    </div>
  );
}

export default App;
