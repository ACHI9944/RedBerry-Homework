import { useEffect } from "react";
import UseInputAndSelect from "../../../hooks/UseInputAndSelect";
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

const FirstNameInput = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: firstNameValue,
    valueHasError: firstNameHasError,
    valueIsTouched: firstnameIsTouched,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    setLocalStorage,
  } = UseInputAndSelect(isValueValid, "firstName");

  //Using useffects to put input value in local storage and take it out when page refreshed  
  useEffect(() => {
    const storedValues = localStorage.getItem("firstName");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage,]);

  useEffect(() => {
    localStorage.setItem("firstName", JSON.stringify(firstNameValue));
  }, [firstNameValue]);

  const { onTakeData } = props;
  //Function to take data to the parent component, including functions to blur
  useEffect(() => {
    onTakeData({
      name: "name",
      value: {
        inputValue: firstNameValue,
        isvalid: !firstNameHasError && firstnameIsTouched,
        blur: firstNameBlurHandler,
      },
    });
  }, [
    firstNameHasError,
    firstNameValue,
    onTakeData,
    firstnameIsTouched,
    firstNameBlurHandler,
  ]);

  //Function to change input validity text depending on validity and which validity is false
  const isGeo = isGeorgian(firstNameValue);
  const isMoreTwo = isMoreThanTwoLetters(firstNameValue);
  const checker = function (state) {
    let valueComment = "მინიმუმ 2 სიმბოლო, ქართული ასოები";
    if (!isGeo && isMoreTwo && firstnameIsTouched) {
      valueComment = "გამოიყენე ქართული ასოები";
    } else if (!isMoreTwo && isGeo && firstnameIsTouched) {
      valueComment = "მინიმუმ 2 სიმბოლო";
    }
    return { valueComment };
  };
  const { valueComment: firstNameComment } = checker(firstNameValue);

  //Variable to change  input classes depending on value validity.
  const firstNameClasses = firstNameHasError
    ? classes.invalidnames
    : classes.names;

  return (
    <div className={firstNameClasses}>
      <label htmlFor="name">სახელი</label>
      <input
        type="text"
        id="name"
        onChange={firstNameChangeHandler}
        onBlur={firstNameBlurHandler}
        value={firstNameValue}
      />
      <p>{firstNameComment}</p>
    </div>
  );
};
export default FirstNameInput;
