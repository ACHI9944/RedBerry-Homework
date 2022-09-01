
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import classes from "./LaptopNameInput.module.css";
const isNotEmpty = (value) => value.trim().length > 0;
const isLatinWithNums = (value) => {
  const regex = /[^a-zA-Z0-9!@#$%^&*()_+=]/ig 
  const inputIsNotNormal = value.trim().match(regex);
  if (inputIsNotNormal) {
    return false;
  } else {
    return true;
  }
};

const isValueValid = (value) => {
  if(isNotEmpty(value) && isLatinWithNums(value)){
    return true
  }else {
    return false
  }
}

const LaptopNameInput = () => {
  const {
    value: laptopNameValue,
    valueHasError: laptopNameHasError,
    valueChangeHandler: laptopNameChangeHandler,
    inputBlurHandler: laptopNameBlurHandler,
    reset: resetLaptopName,
  } = UseInputAndSelect(isValueValid);

  const laptopClasses = laptopNameHasError
    ? classes.laptopinvalidname
    : classes.laptopname;
  return (
    <div className={laptopClasses}>
      <label htmlFor="name">ლეპტოპის სახელი</label>
      <input
        type="name"
        id="name"
        onChange={laptopNameChangeHandler}
        onBlur={laptopNameBlurHandler}
        value={laptopNameValue}
      />
      <p>ლათინური ასოები, ციფრები, !@#$%^&*()_+=</p>
    </div>
  );
};

export default LaptopNameInput;
