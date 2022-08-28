import { NavLink } from "react-router-dom";
import classes from "./FormNavigation.module.css";

const FormNavigation = () => {
  return (
    <header className={classes.header}>
      <ul>
        <li>
          <NavLink
            to="personform"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            თანამშრომლის ინფო
          </NavLink>
        </li>
        <li>
          <NavLink
            to="laptopForm"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            ლეპტოპის მახასიათებლები
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default FormNavigation;
