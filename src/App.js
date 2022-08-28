import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import List from "./list/List";
import MainNavigation from "./layout/MainNavigation";
import Forms from "./forms/Forms";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" />} />
      <Route path="/main" element={<MainNavigation />} />
      <Route path="/add/*" element={<Forms />} />
      <Route path="/list" element={<List />} />
    </Routes>
  );
}

export default App;
