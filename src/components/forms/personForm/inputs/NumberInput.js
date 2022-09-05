import { useEffect } from "react";
import UseInputAndSelect from "../../../hooks/UseInputAndSelect";
import classes from "./NumberInput.module.css";

//function for Checking input validity
const isExactNumbers = (value) => value.toString().trim().length === 13;
const startsCorrectly = (value) => {
  const numStart = value.trim().toString().slice(0, 5);
  const validStart = "+9955";
  if (numStart === validStart) {
    return true;
  } else {
    return false;
  }
};
const isValueValid = (value) => {
  if (isExactNumbers(value) && startsCorrectly(value)) {
    return true;
  } else {
    return false;
  }
};


const NumberInput = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: numberValue,
    valueHasError: numberHasError,
    valueIsTouched: numberIsTouched,
    valueChangeHandler: numberChangeHandler,
    inputBlurHandler: numberBlurHandler,
    setLocalStorage
  } = UseInputAndSelect(isValueValid);

  //Using useffects to put input value in local storage and take it out when page refreshed  
  useEffect(() => {
    const storedValues = localStorage.getItem("number");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage]);

  useEffect(() => {
    localStorage.setItem("number", JSON.stringify(numberValue));
  }, [numberValue]);
  const { onTakeData } = props;
//Function to take data to the parent component, including functions to blur
  useEffect(() => {
    onTakeData({
      name: "phone_number",
      value: {
        inputValue: numberValue,
        isvalid: !numberHasError && numberIsTouched,
        blur: numberBlurHandler,
      },
    });
  }, [
    numberValue,
    numberHasError,
    onTakeData,
    numberIsTouched,
    numberBlurHandler,
  ]);

  //Variable to change  input classes depending on value validity.
  const numberClasses = numberHasError ? classes.invalidNumber : classes.number;

  return (
    <div className={numberClasses}>
      <label htmlFor="number">ტელეფონის ნომერი</label>

      <input
        type="text"
        id="number"
        onChange={numberChangeHandler}
        onBlur={numberBlurHandler}
        value={numberValue}
      />
      <p>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</p>
    </div>
  );
};

export default NumberInput;
