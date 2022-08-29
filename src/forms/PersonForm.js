import { useNavigate } from "react-router-dom";
import classes from "./PersonForm.module.css";

const PersonForm = () => {
  const navigate = useNavigate();
  const icon = (
    <ion-icon name="chevron-back-outline"></ion-icon>
  );
  const goBack = () => {
    navigate("/main");
  };

  const forwardToNextInfo = () => {
    navigate("/add/laptopForm");
  };
  return (
    <div>
      <button onClick={goBack} className={classes.backButton}>
        {icon}
      </button>
      <p>თანამშრომლის ინფო</p>
      <button className={classes.button} onClick={forwardToNextInfo}>
        შემდეგი
      </button>
    </div>
  );
};

export default PersonForm;
