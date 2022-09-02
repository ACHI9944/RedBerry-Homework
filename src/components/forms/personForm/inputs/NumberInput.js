import { useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
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
    reset: resetnumber,
  } = UseInputAndSelect(isValueValid);

  const { onTakeData } = props;
//Function to take data to the parent component, including functions to blur and reset
  useEffect(() => {
    onTakeData({
      name: "number",
      value: {
        inputValue: numberValue,
        isvalid: !numberHasError && numberIsTouched,
        blur: numberBlurHandler,
        reset: resetnumber,
      },
    });
  }, [
    numberValue,
    numberHasError,
    onTakeData,
    numberIsTouched,
    numberBlurHandler,
    resetnumber,
  ]);

  //Variable to change  input classes depending on value validity.
  const numberClasses = numberHasError ? classes.invalidNumber : classes.number;

  return (
    <div className={numberClasses}>
      <label htmlFor="email">ტელეფონის ნომერი</label>

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
