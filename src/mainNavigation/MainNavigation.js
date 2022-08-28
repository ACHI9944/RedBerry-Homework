import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logo from "../pictures/redbrr.PNG";

const MainNavigation = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <p>RedBerry</p>
      </header>

      <div className={classes.logoimg}>
        <img src={logo} alt="logo"></img>
      </div>

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
    </Fragment>
  );
};

export default MainNavigation;
