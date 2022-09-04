import { useEffect } from "react";
import UseInputAndSelect from "../../../hooks/UseInputAndSelect";
import classes from "./EmailInput.module.css";

//function for Checking input validity
const emailEndsCorrectly = (value) => {
  const slicedValue = value.trim().slice(-12);
  const redberry = "@redberry.ge";
  if (redberry === slicedValue) {
    return true;
  } else {
    return false;
  }
};

const EmailInput = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: emailValue,
    valueHasError: emailHasError,
    valueIsTouched: emailIsTouched,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    setLocalStorage,
  } = UseInputAndSelect(emailEndsCorrectly);

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect( () => {

    const storedValues = localStorage.getItem("email");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
     setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage]);

  useEffect(() => {
    localStorage.setItem("email", JSON.stringify(emailValue));
  }, [emailValue]);

  //Function to take data to the parent component, including function to blur
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "email",
      value: {
        inputValue: emailValue,
        isvalid: !emailHasError && emailIsTouched,
        blur: emailBlurHandler,
      },
    });
  }, [
    emailHasError,
    emailValue,
    onTakeData,
    emailIsTouched,
    emailBlurHandler,
  ]);

  //Variable to change  input classes depending on value validity.
  const emailClasses = emailHasError ? classes.invalidEmail : classes.email;

  return (
    <div className={emailClasses}>
      <label htmlFor="email">მეილი</label>
      <input
        type="email"
        id="email"
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={emailValue}
      />
      <p>უნდა მთავრდებოდეს @redberry.ge-ით"</p>
    </div>
  );
};

export default EmailInput;
