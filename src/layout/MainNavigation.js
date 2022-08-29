import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logo from "../pictures/redbrr.PNG";
import redberry from "../pictures/redberylogo.png";

const MainNavigation = () => {
  return (
    <main className={classes.main}>
      <header className={classes.header}>
        <img src={redberry} alt="logo"></img>
      </header>

      <img src={logo} alt="logo"></img>

      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="/add"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              ჩანაწერის დამატება
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/list"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              ჩანაწერების სია
            </NavLink>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export default MainNavigation;
