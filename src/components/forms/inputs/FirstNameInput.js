import UseNamesInput from "../../../hooks/UseNamesInput";


const FirstNameInput = () => {
    const {
        value: firstNameValue,
        comment: firstNameComment,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstName,
        valueClasses: firstNameClasses
      } = UseNamesInput();
    return <div className={firstNameClasses}>
    <label htmlFor="name">სახელი</label>
    <input
      type="text"
      id="name"
      onChange={firstNameChangeHandler}
      onBlur={firstNameBlurHandler}
      value={firstNameValue}
      
    />
    {firstNameComment}
  </div>
}
export default FirstNameInput