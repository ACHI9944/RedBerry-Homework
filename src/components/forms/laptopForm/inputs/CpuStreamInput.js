import { useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
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
    valueChangeHandler: CpuStreamChangeHandler,
    inputBlurHandler: CpuStreamBlurHandler,
    reset: resetCpuStream,
  } = UseInputAndSelect(isValueValid);

  //Function to take data to the parent component, including functions to blur and reset
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "cpustream",
      value: {
        inputValue: CpuStreamValue,
        isvalid: !CpuStreamHasError,
        blur: CpuStreamBlurHandler,
        reset: resetCpuStream,
      },
    });
  }, [
    CpuStreamValue,
    CpuStreamHasError,
    CpuStreamBlurHandler,
    resetCpuStream,
    onTakeData,
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
