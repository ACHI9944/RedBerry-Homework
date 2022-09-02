import { useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
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
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = UseInputAndSelect(emailEndsCorrectly);

  //Function to take data to the parent component, including functions to blur and reset
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "email",
      value: {
        inputValue: emailValue,
        isvalid: !emailHasError,
        blur: emailBlurHandler,
        reset: resetEmail,
      },
    });
  }, [emailHasError, emailValue, onTakeData, emailBlurHandler, resetEmail]);

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
