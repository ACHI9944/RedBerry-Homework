import { Fragment, useCallback, useState } from "react";
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
import LaptopPriceInput from "./inputs/LaptopPriceInput";
import Condition from "./radios/Condition";
import Button from "../../button/Button";

const LaptopForm = (props) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/add/personform");
  };

  const backToPersonForm = () => {
    navigate("/add/personform");
  };
    
//State for gathering all data from component inputs
const [laptopValues, setlaptopValues] = useState({
  lapName: {},
  LapBrand: {},
  cpu: {},
  cpucore: {},
  cpustream: {},
  lapram: {},
  date: {},
  lapPrice: {},
  memoryRadio: {},
  ConditionRadio: {},
});
//function for merging incoming data to existing data in state
const mergeData = useCallback((value) => {
  setlaptopValues((previousValues) => ({
    ...previousValues,
    [value.name]: value.value,
  }));
}, []);


//function for submitting form. to check validity of every single input
const submitDataHandler = (event) => {
  event.preventDefault()
  if (
    laptopValues.img.isvalid &&
    laptopValues.lapName.isvalid &&
    laptopValues.LapBrand.isvalid &&
    laptopValues.cpu.isvalid &&
    laptopValues.cpucore.isvalid &&
    laptopValues.cpustream.isvalid &&
    laptopValues.lapram.isvalid &&
    laptopValues.date.isvalid &&
    laptopValues.lapPrice.isvalid &&
    laptopValues.memoryRadio.isvalid &&
    laptopValues.ConditionRadio.isvalid
  ) {
    navigate("/added");
  } else {
    laptopValues.img.blur()
    laptopValues.lapName.blur()
    laptopValues.LapBrand.blur()
    laptopValues.cpu.blur()
    laptopValues.cpucore.blur()
    laptopValues.cpustream.blur()
    laptopValues.lapram.blur()
    laptopValues.date.blur()
    laptopValues.lapPrice.blur()
    laptopValues.memoryRadio.blur()
    laptopValues.ConditionRadio.blur()
  }
};
  return (
    <Fragment>
      <Button onBack={goBack} />
      <form className={classes.laptopForm} onSubmit={submitDataHandler}>
        <ImageInput onTakeData={mergeData}/>
        <div className={classes.lapNameAndBrand}>
          <LaptopNameInput onTakeData={mergeData}/>
          <SelectLapBrand lapBrands={props.lapBrands} onTakeData={mergeData}/>
        </div>
        <div className={classes.aboutCpu}>
          <SelectCpu Cpus={props.Cpus} onTakeData={mergeData}/>
          <CpuCoreInput onTakeData={mergeData}/>
          <CpuStreamInput onTakeData={mergeData}/>
        </div>
        <div className={classes.ramAndType}>
          <LapRamInput onTakeData={mergeData}/>
          <MemoryRadio onTakeData={mergeData}/>
        </div>
        <div className={classes.dateAndPrice}>
          <DateInput onTakeData={mergeData}/>
          <LaptopPriceInput onTakeData={mergeData}/>
        </div>
        <Condition onTakeData={mergeData}/>
        <div className={classes.lowerButtons}>
          <button className={classes.miniBackButton} onClick={backToPersonForm}>
            უკან
          </button>
          <button className={classes.saveButton}>
            დამახსოვრება
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default LaptopForm;
