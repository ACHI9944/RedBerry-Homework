import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Forms from "./components/forms/Forms";
import List from "./list/List";

import MainNavigation from "./mainNavigation/MainNavigation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" />} />
      <Route path="/main/*" element={<MainNavigation />} />
      <Route path="/add" element={<Forms />} />
      <Route path="/list" element={<List />} />
    </Routes>
  );
}

export default App;
