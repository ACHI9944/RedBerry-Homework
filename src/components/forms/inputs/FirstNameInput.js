import UseNamesInput from "../../../hooks/UseNamesInput";
import classes from './FirstnameLastname.module.css'

const FirstNameInput = () => {
  const {
    value: firstNameValue,
    comment: firstNameComment,
    valueChangeHandler: firstNameChangeHandler,
    valuehasError: firstNameHasError,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = UseNamesInput();

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
