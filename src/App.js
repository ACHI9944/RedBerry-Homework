import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainNavigation from "./components/MainNavigation";
import Forms from "./components/forms/Forms";
import List from "../src/components/list/List";
import Completed from "./components/completed/Completed";

//Main token that can be changed everywhere from here
const token = "b818a3f69123863b3f427d4dd1d7866d";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" />} />
      <Route path="/main" element={<MainNavigation />} />
      <Route path="/add/*" element={<Forms mainToken={token} />} />
      <Route path="/added" element={<Completed />} />
      <Route path="/list" element={<List mainToken={token} />} />
    </Routes>
  );
}

export default App;
