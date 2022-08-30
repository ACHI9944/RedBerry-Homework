import UseEmailInput from "../../../hooks/UseEmailInput";



const EmailInput = () => {
  const {
    value: emailValue,
    comment: emailComment,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
    emailClasses,
  } = UseEmailInput();

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
      {emailComment}
    </div>
  );
};

export default EmailInput;
