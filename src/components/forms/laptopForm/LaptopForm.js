import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import CpuCoreInput from "./inputs/CpuCoreInput";
import CpuStreamInput from "./inputs/CpuStreamInput";
import DateInput from "./inputs/DateInput";
import ImageInput from "./inputs/ImageInput";
import LapRamInput from "./inputs/LapRamInput";
import LaptopNameInput from "./inputs/LaptopNameInput";
import classes from "./LaptopForm.module.css";
import MemoryRadio from "./radios/MemoryRadio";
import SelectCpu from "./selects/SelectCpu";
import SelectLapBrand from "./selects/SelectLapBrand";
import LaptopPriceInput from './inputs/LaptopPriceInput'
import Condition from './radios/Condition'

const LaptopForm = (props) => {
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
        <SelectLapBrand lapBrands={props.lapBrands}/>
        </div>
        <div className={classes.aboutCpu}>
            <SelectCpu Cpus={props.Cpus}/>
            <CpuCoreInput />
            <CpuStreamInput />
        </div>
        <div className={classes.ramAndType}>
        <LapRamInput />
        <MemoryRadio />
        </div>
        <div className={classes.dateAndPrice}>
          <DateInput />
          <LaptopPriceInput />
        </div>
        <Condition />
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
