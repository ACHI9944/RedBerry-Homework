import UseEmailInput from "../../../hooks/UseEmailInput";
import classes from './EmailInput.module.css'

const EmailInput = () => {
  const {
    value: emailValue,
    comment: emailComment,
    valueChangeHandler: emailChangeHandler,
    valueHasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = UseEmailInput();
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
      <p>{emailComment}</p>
    </div>
  );
};

export default EmailInput;
