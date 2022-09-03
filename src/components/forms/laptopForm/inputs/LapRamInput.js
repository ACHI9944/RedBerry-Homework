import { useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import classes from "./LapRamInput.module.css";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;
const isNumber = (value) => {
  const regex = /[^0-9]/g;
  const NotNumber = value.trim().match(regex);
  if (NotNumber) {
    return false;
  } else {
    return true;
  }
};
const isValueValid = (value) => {
  if (isNotEmpty(value) && isNumber(value)) {
    return true;
  } else {
    return false;
  }
};

const LapRamInput = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: LapRamValue,
    valueHasError: LapRamHasError,
    valueIsTouched: LapRamIsTouched,
    valueChangeHandler: LapRamChangeHandler,
    inputBlurHandler: LapRamBlurHandler,
    reset: resetLapRam,
    setLocalStorage,
  } = UseInputAndSelect(isValueValid);

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("lapRam");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage]);

  useEffect(() => {
    localStorage.setItem("lapRam", JSON.stringify(LapRamValue));
  }, [LapRamValue]);

  //Function to take data to the parent component, including functions to blur and reset
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "lapram",
      value: {
        inputValue: LapRamValue,
        isvalid: !LapRamHasError && LapRamIsTouched,
        blur: LapRamBlurHandler,
        reset: resetLapRam,
      },
    });
  }, [
    onTakeData,
    LapRamValue,
    LapRamHasError,
    LapRamIsTouched,
    LapRamBlurHandler,
    resetLapRam,
  ]);

  //Variable to change  input classes depending on value validity.
  const lapRamClasses = LapRamHasError ? classes.invalidLapRam : classes.LapRam;

  return (
    <div className={lapRamClasses}>
      <label htmlFor="number">ლეპტოპის RAM (GB)</label>

      <input
        type="text"
        id="number"
        onChange={LapRamChangeHandler}
        onBlur={LapRamBlurHandler}
        value={LapRamValue}
      />
      <p>მხოლოდ ციფრები</p>
    </div>
  );
};

export default LapRamInput;
