import { useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import classes from "./FirstnameLastname.module.css";

//function for Checking input validity
const isMoreThanTwoLetters = (value) => value.trim().length > 2;
const isGeorgian = (value) => {
  const regex = /[^\u10A0-\u10FF]/gi;
  const allIsNotGeorgian = value.trim().match(regex);
  if (allIsNotGeorgian) {
    return false;
  } else {
    return true;
  }
};
const isValueValid = (value) => {
  if (isMoreThanTwoLetters(value) && isGeorgian(value)) {
    return true;
  } else {
    return false;
  }
};

const LastNameInput = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: lastNameValue,
    valueHasError: lastNameHasError,
    valueIsTouched: lastnameIsTouched,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetlastName,
    setLocalStorage
  } = UseInputAndSelect(isValueValid);

  const { onTakeData } = props;

  //Using useffects to put input value in local storage and take it out when page refreshed  
  useEffect(() => {
    const storedValues = localStorage.getItem("lastName");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage]);

  useEffect(() => {
    localStorage.setItem("lastName", JSON.stringify(lastNameValue));
  }, [lastNameValue]);

  //Function to take data to the parent component, including functions to blur and reset
  useEffect(() => {
    onTakeData({
      name: "lastName",
      value: {
        inputValue: lastNameValue,
        isvalid: !lastNameHasError && lastnameIsTouched,
        blur: lastNameBlurHandler,
        reset: resetlastName,
      },
    });
  }, [
    lastNameHasError,
    lastNameValue,
    onTakeData,
    lastnameIsTouched,
    lastNameBlurHandler,
    resetlastName
  ]);

  //Function to change input validity text depending on validity and which validity is false
  const isGeo = isGeorgian(lastNameValue);
  const isMoreTwo = isMoreThanTwoLetters(lastNameValue);
  const checker = function (state) {
    let valueComment = "მინიმუმ 2 სიმბოლო, ქართული ასოები";
    if (!isGeo && isMoreTwo && lastnameIsTouched) {
      valueComment = "გამოიყენე ქართული ასოები";
    } else if (!isMoreTwo && isGeo && lastnameIsTouched) {
      valueComment = "მინიმუმ 2 სიმბოლო";
    }
    return { valueComment };
  };
  const { valueComment: lastNameComment } = checker(lastNameValue);

  //Variable to change  input classes depending on value validity.
  const lastNameClasses = lastNameHasError
    ? classes.invalidnames
    : classes.names;

  return (
    <div className={lastNameClasses}>
      <label htmlFor="name">სახელი</label>
      <input
        type="text"
        id="name"
        onChange={lastNameChangeHandler}
        onBlur={lastNameBlurHandler}
        value={lastNameValue}
      />
      <p>{lastNameComment}</p>
    </div>
  );
};
export default LastNameInput;
