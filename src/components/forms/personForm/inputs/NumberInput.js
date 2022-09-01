import { useCallback, useEffect, } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import classes from "./NumberInput.module.css";

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
  const {
    value: numberValue,
    valueHasError: numberHasError,
    valueIsTouched: numberIsTouched,
    valueChangeHandler: numberChangeHandler,
    inputBlurHandler: numberBlurHandler,
    reset: resetnumber,
  } = UseInputAndSelect(isValueValid);


  const { onTakeData} = props;
 /*  const blurNumber = useCallback(()=>numberBlurHandler(),[numberBlurHandler]) */

  useEffect(() => {
    onTakeData({
      name: "number",
      value: {
        inputValue: numberValue,
        isvalid: !numberHasError && numberIsTouched,
        blur: numberBlurHandler
      },
    });
  }, [numberValue, numberHasError, onTakeData,numberIsTouched,numberBlurHandler]);

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
