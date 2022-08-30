import UseNamesInput from "../../../hooks/UseNamesInput";


const LastNameInput = () => {
  const {
    value: lastNameValue,
    comment: lastNameComment,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetlastName,
    valueClasses: lastNameClasses,
  } = UseNamesInput();
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
      {lastNameComment}
    </div>
  );
};

export default LastNameInput;
