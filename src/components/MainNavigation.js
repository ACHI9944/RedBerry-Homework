import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logo from "../assets/pictures/redbrr.PNG";
import redberry from "../assets/pictures/redberylogo.png";
import redberrymob from "../assets/pictures/redbrr.mobile.PNG";

const MainNavigation = () => {
  return (
    <main className={classes.main}>
      <header className={classes.header}>
        <img src={redberry} alt="logo" />
      </header>
      <img src={logo} alt="logo"  className={classes.logoImg}/>
      <img src={redberrymob} alt="logomob" className={classes.logoImgMob}/>
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
