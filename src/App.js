import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Completed from "./completed/Completed";
import MainNavigation from "./components/MainNavigation";
import Forms from "./components/forms/Forms";
import List from "./list/List";
import ListItem from "./list/ListITem";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" />} />
      <Route path="/main" element={<MainNavigation />} />
      <Route path="/add/*" element={<Forms />} />
      <Route path="/added" element={<Completed />} />
      <Route path="/list" element={<List />} />
      <Route path="/listitem" element={<ListItem />} />
    </Routes>
  );
}

export default App;
