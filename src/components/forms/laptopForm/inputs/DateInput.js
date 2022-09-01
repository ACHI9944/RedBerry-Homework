import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import classes from "./DateInput.module.css";

const isNotEmpty = (value) => value.trim().length > 0;
const isNumber = (value) => {
  const regex = /[^0-9 /.]/g;
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
const DateInput = () => {
  const {
    value: dateValue,
    valueHasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDate,
  } = UseInputAndSelect(isValueValid);
  const dateClasses = dateHasError
    ? classes.invalidDate
    : classes.date;

  return (
    <div className={dateClasses}>
      <label>შეძენის რიცხვი(არჩევითი)</label>
      <input
        type="text"
        name="date"
        placeholder="დდ / თთ / წწწწ"
        value={dateValue}
        onChange={dateChangeHandler}
        onBlur={dateBlurHandler}
      />
   </div>
  );
};

export default DateInput;
