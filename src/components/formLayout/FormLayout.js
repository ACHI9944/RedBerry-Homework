import classes from "./FormLayout.module.css";
import logo from "../../assets/pictures/5bdb2fe4dde9ecbf66f88a7fe003af97.png";
import FormNavigation from "./FormNavigation";

const FormLayout = (props) => {
  return (
    <div className={classes.layout}>
      <FormNavigation />
      <div className={classes.forms}>{props.children}</div>
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default FormLayout;
