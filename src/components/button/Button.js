import classes from "./Button.module.css";
const icon = <ion-icon name="chevron-back-outline"></ion-icon>;

const Button = (props) => {
  return (
    <button onClick={props.onBack} className={`${classes.button} ${props.className}`}>
      {icon}
    </button>
  );
};

export default Button;
