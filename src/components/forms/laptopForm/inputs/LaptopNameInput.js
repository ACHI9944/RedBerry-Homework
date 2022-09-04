import { useEffect } from "react";
import UseInputAndSelect from "../../../hooks/UseInputAndSelect";
import classes from "./LaptopNameInput.module.css";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;
const isLatinWithNums = (value) => {
  const regex = /[^a-zA-Z0-9!@#$%^&*()_+=]/gi;
  const inputIsNotNormal = value.trim().match(regex);
  if (inputIsNotNormal) {
    return false;
  } else {
    return true;
  }
};
const isValueValid = (value) => {
  if (isNotEmpty(value) && isLatinWithNums(value)) {
    return true;
  } else {
    return false;
  }
};

const LaptopNameInput = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: laptopNameValue,
    valueHasError: laptopNameHasError,
    valueIsTouched: laptopNameIsTouched,
    valueChangeHandler: laptopNameChangeHandler,
    inputBlurHandler: laptopNameBlurHandler,
    setLocalStorage,
  } = UseInputAndSelect(isValueValid);

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("lapName");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage]);

  useEffect(() => {
    localStorage.setItem("lapName", JSON.stringify(laptopNameValue));
  }, [laptopNameValue]);

  //Function to take data to the parent component, including functions to blur
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "laptop_name",
      value: {
        inputValue: laptopNameValue,
        isvalid: !laptopNameHasError && laptopNameIsTouched,
        blur: laptopNameBlurHandler,
      },
    });
  }, [
    onTakeData,
    laptopNameValue,
    laptopNameHasError,
    laptopNameIsTouched,
    laptopNameBlurHandler,
  ]);

  //Variable to change  input classes depending on value validity.
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
