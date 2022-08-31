import UseNamesInput from "../../../hooks/UseNamesInput";
import classes from "./FirstnameLastname.module.css";

const LastNameInput = () => {
  const {
    value: lastNameValue,
    comment: lastNameComment,
    valueChangeHandler: lastNameChangeHandler,
    valuehasError: lastNameHasError,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetlastName,
  } = UseNamesInput();

  const lastNameClasses = lastNameHasError
    ? classes.invalidnames
    : classes.names;

  return (
    <div className={lastNameClasses}>
      <label htmlFor="surname">გვარი</label>
      <input
        type="text"
        id="surname"
        onChange={lastNameChangeHandler}
        onBlur={lastNameBlurHandler}
        value={lastNameValue}
      />
      <p>{lastNameComment}</p>
    </div>
  );
};

export default LastNameInput;
