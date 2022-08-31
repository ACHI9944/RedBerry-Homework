
import UseLaptopNameInput from "../../../hooks/UseLaptopNameInput";
import classes from './LaptopNameInput.module.css'

const LaptopNameInput = () => {
    const {
        value: laptopNameValue,
        comment: laptopNameComment,
        valueHasError: laptopNameHasError,
        valueChangeHandler: laptopNameChangeHandler,
        inputBlurHandler: laptopNameBlurHandler,
        reset: resetLaptopName,
      } = UseLaptopNameInput();
      
      const laptopClasses = laptopNameHasError ? classes.laptopinvalidname : classes.laptopname
  return (
    <div className={laptopClasses}>
      <label htmlFor="name">ლეპტოპის სახელი</label>
      <input
        type="name"
        id="name"
        onChange={laptopNameChangeHandler}
        onBlur={laptopNameBlurHandler}
        value={laptopNameValue}
      />
      <p>{laptopNameComment}</p>
    </div>
  );
};

export default LaptopNameInput;
