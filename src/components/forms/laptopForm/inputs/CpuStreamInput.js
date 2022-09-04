import { useEffect } from "react";
import UseInputAndSelect from "../../../hooks/UseInputAndSelect";
import classes from "./CpuStreamInput.module.css";

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

const CpuStreamInput = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: CpuStreamValue,
    valueHasError: CpuStreamHasError,
    valueIsTouched: CpuStreamIsTouched,
    valueChangeHandler: CpuStreamChangeHandler,
    inputBlurHandler: CpuStreamBlurHandler,
    setLocalStorage,
  } = UseInputAndSelect(isValueValid);

  //Using useffects to put input value in local storage and take it out when page refreshed  
  useEffect(() => {
    const storedValues = localStorage.getItem("cpuStream");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage,]);

  useEffect(() => {
    localStorage.setItem("cpuStream", JSON.stringify(CpuStreamValue));
  }, [CpuStreamValue]);

  //Function to take data to the parent component, including functions to blur and
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "laptop_cpu_threads",
      value: {
        inputValue: +CpuStreamValue,
        isvalid: !CpuStreamHasError && CpuStreamIsTouched,
        blur: CpuStreamBlurHandler,
      },
    });
  }, [
    CpuStreamValue,
    CpuStreamHasError,
    CpuStreamIsTouched,
    onTakeData,
    CpuStreamBlurHandler,
  ]);

  //Variable to change  input classes depending on value validity.
  const numberClasses = CpuStreamHasError
    ? classes.invalidCpuStream
    : classes.CpuStream;

  return (
    <div className={numberClasses}>
      <label htmlFor="number">CPU-ს ნაკადი</label>

      <input
        type="text"
        id="number"
        onChange={CpuStreamChangeHandler}
        onBlur={CpuStreamBlurHandler}
        value={CpuStreamValue}
      />
      <p>მხოლოდ ციფრები</p>
    </div>
  );
};

export default CpuStreamInput;
