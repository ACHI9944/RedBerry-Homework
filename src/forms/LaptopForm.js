import { useNavigate } from "react-router-dom";
import classes from "./LaptopForm.module.css";

const LaptopForm = () => {
  const navigate = useNavigate();

  const icon = (
    <ion-icon name="chevron-back-outline"></ion-icon>
  );

  const goBack = () => {
    navigate("/add/personform");
  };
  
  const backToPersonForm = () => {
    navigate("/add/personform");
  };

  const saveInfo = () => {
    navigate("/added");
  };

  return (
    <div>
      <button onClick={goBack} className={classes.backButton}>
        {icon}
      </button>
      <button className={classes.button} onClick={backToPersonForm}>
        უკან
      </button>
      <button className={classes.saveButton} onClick={saveInfo}>
        დამახსოვრება
      </button>
    </div>
  );
};

export default LaptopForm;
