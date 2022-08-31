import UseNumberInput from "../../../hooks/UseNumberInput";
import classes from './NumberInput.module.css'

const NumberInput = () => {
  const {
    value: numberValue,
    comment: numberComment,
    valueChangeHandler: numberChangeHandler,
    valueHasError: numberHasError,
    inputBlurHandler: numberBlurHandler,
    reset: resetnumber,
  } = UseNumberInput();

  
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
      <p>{numberComment}</p>
    </div>
  );
};

export default NumberInput;
