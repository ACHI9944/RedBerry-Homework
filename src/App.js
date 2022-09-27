import { Routes, Route, Navigate } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import Forms from "./components/forms/Forms";
import List from "../src/components/list/List";
import Completed from "./components/completed/Completed";


//Hosting page
// https://redberry-44161.web.app/main

//Main token that can be changed everywhere from here
const token = "8c27832eb65673dcf28aa4c7ece9f294";
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
