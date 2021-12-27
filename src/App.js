import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainDrawer from "./components/drawer/MainDrawer";
import Domov from "./pages/Domov/Domov";
import Nastavitve from "./pages/Nastavitve/Nastavitve";
import ObjaviOglas from "./pages/ObjaviOglas/ObjaviOglas";
import Pomoc from "./pages/Pomoc/Pomoc";

function App() {
  return (
    <div className="App">
      <MainDrawer />
      <Routes>
        <Route path="/" element={<Domov />} />
        <Route path="/objavi" element={<ObjaviOglas />} />
        <Route path="/pomoc" element={<Pomoc />} />
        <Route path="/nastavitve" element={<Nastavitve />} />
      </Routes>
    </div>
  );
}

export default App;
