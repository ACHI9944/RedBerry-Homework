import UseInput from "../../../hooks/UseInput";
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

const NumberInput = () => {
  const {
    value: numberValue,
    valueHasError: numberHasError,
    valueChangeHandler: numberChangeHandler,
    inputBlurHandler: numberBlurHandler,
    reset: resetnumber,
  } = UseInput(isValueValid);

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
