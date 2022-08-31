import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ImageInput from "./inputs/ImageInput";
import LaptopNameInput from "./inputs/LaptopNameInput";
import classes from "./LaptopForm.module.css";
import SelectLapBrand from "./selects/SelectLapBrand";

const LaptopForm = () => {
  const navigate = useNavigate();

  const icon = <ion-icon name="chevron-back-outline"></ion-icon>;

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
    <Fragment>
      <button onClick={goBack} className={classes.backButton}>
        {icon}
      </button>
      <form className={classes.laptopForm}>
        <ImageInput />
        <div className={classes.lapNameAndBrand}>
        <LaptopNameInput />
        <SelectLapBrand />
        </div>
        <div className={classes.lowerButtons}>
          <button className={classes.miniBackButton} onClick={backToPersonForm}>
            უკან
          </button>
          <button className={classes.saveButton} onClick={saveInfo}>
            დამახსოვრება
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default LaptopForm;
