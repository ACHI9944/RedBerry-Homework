import { useEffect, useState } from "react";
import UseInputAndSelect from "../../../hooks/UseInputAndSelect";
import classes from "./DateInput.module.css";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;
const isNumber = (value) => {
  const regex = /[^0-9 /.]/g;
  const NotNumber = value.trim().match(regex);
  if (NotNumber) {
    return false;
  } else {
    return true;
  }
};
const isValueValid = (value) => {
  if (isNotEmpty(value)) {
    return true;
  } else {
    return false;
  }
};
const DateInput = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: dateValue,
    valueHasError: dateHasError,
    valueIsTouched: dateIsTouched,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    setLocalStorage,
  } = UseInputAndSelect(isValueValid);

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("date");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage]);

  useEffect(() => {
    localStorage.setItem("date", JSON.stringify(dateValue));
  }, [dateValue]);

  //Function to take data to the parent component, including functions to blur and
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "laptop_purchase_date",
      value: {
        inputValue: dateValue,
        isvalid: !dateHasError && dateIsTouched,
        blur: dateBlurHandler,
      },
    });
  }, [onTakeData, dateValue, dateHasError, dateIsTouched, dateBlurHandler]);

  //Variable to change  input classes depending on value validity.
  const dateClasses = dateHasError ? classes.invalidDate : classes.date;

  const [dateType, setDateType] = useState("text");
  const changeType = () => {
    setDateType("date");
  };

  return (
    <div className={dateClasses}>
      <label>შეძენის რიცხვი(არჩევითი)</label>
      <input
        onFocus={changeType}
        type={dateType}
        name="date"
        placeholder="დდ / თთ / წწწწ"
        value={dateValue}
        onChange={dateChangeHandler}
        onBlur={dateBlurHandler}
      />
    </div>
  );
};

export default DateInput;
