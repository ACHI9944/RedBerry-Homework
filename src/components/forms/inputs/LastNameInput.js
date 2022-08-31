
import UseInput from "../../../hooks/UseInput";
import classes from "./FirstnameLastname.module.css";

const isMoreThanTwoLetters = (value) => value.trim().length > 2;
const isGeorgian = (value) => {
  const regex = /[^\u10A0-\u10FF]/ig;
  const allIsNotGeorgian = value.trim().match(regex);
  if (allIsNotGeorgian) {
    return false;
  } else {
    return true;
  }
};
const isValueValid = (value) => {
  if(isMoreThanTwoLetters(value) && isGeorgian(value)) {
    return true
  }else {
    return false
  }
}

const LastNameInput = () => {
  const {
    value: lastNameValue,
    valueHasError: lastNameHasError,
    valueIsTouched: lastnameIsTouched,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetlastName,
  } = UseInput(isValueValid);

  const isGeo = isGeorgian(lastNameValue)
  const isMoreTwo = isMoreThanTwoLetters(lastNameValue)

  const checker = function (state) {
    let valueComment = "მინიმუმ 2 სიმბოლო, ქართული ასოები";
    if (!isGeo && isMoreTwo && lastnameIsTouched) {
      valueComment = "გამოიყენე ქართული ასოები";
    } else if (!isMoreTwo && isGeo && lastnameIsTouched) {
      valueComment = "მინიმუმ 2 სიმბოლო";
    } else if (lastNameHasError && lastnameIsTouched) {
      valueComment = "მინიმუმ 2 სიმბოლო, ქართული ასოები";
    } else if (!lastNameHasError && lastnameIsTouched) {
      valueComment = "მინიმუმ 2 სიმბოლო, ქართული ასოები";
    }
    return { valueComment };
  };
  const { valueComment:lastNameComment } = checker(lastNameValue);

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