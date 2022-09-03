import { useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import classes from "./CpuCoreInput.module.css";

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

const CpuCoreInput = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: CpuCoreValue,
    valueHasError: CpuCoreHasError,
    valueIsTouched: CpuCoreIsTouched,
    valueChangeHandler: CpuCoreChangeHandler,
    inputBlurHandler: CpuCoreBlurHandler,
    setLocalStorage,
  } = UseInputAndSelect(isValueValid);

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("cpuCore");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage]);

  useEffect(() => {
    localStorage.setItem("cpuCore", JSON.stringify(CpuCoreValue));
  }, [CpuCoreValue]);

  //Function to take data to the parent component, including functions to blur
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "cpucore",
      value: {
        inputValue: CpuCoreValue,
        isvalid: !CpuCoreHasError && CpuCoreIsTouched,
        blur: CpuCoreBlurHandler,
      },
    });
  }, [
    CpuCoreValue,
    CpuCoreHasError,
    CpuCoreIsTouched,
    CpuCoreBlurHandler,
    onTakeData,
  ]);
  //Variable to change  input classes depending on value validity.

  const numberClasses = CpuCoreHasError
    ? classes.invalidCpuCore
    : classes.CpuCore;

  return (
    <div className={numberClasses}>
      <label htmlFor="number">CPU-ს ბირთვი</label>

      <input
        type="text"
        id="number"
        onChange={CpuCoreChangeHandler}
        onBlur={CpuCoreBlurHandler}
        value={CpuCoreValue}
      />
      <p>მხოლოდ ციფრები</p>
    </div>
  );
};

export default CpuCoreInput;
