import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainNavigation from "./components/MainNavigation";
import Forms from "./components/forms/Forms";
import List from '../src/components/list/List'
import ListItem from '../src/components/list/ListItems'
import Completed from "./components/completed/Completed";

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
