import { useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import classes from "./LaptopPriceInput.module.css";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;
const isNumber = (value) => {
  const regex = /[^0-9]/g;
  const NotNumber = value.trim().match(regex);
  if (NotNumber) {
    return false;
  } else {
    return true;
  }
};
const isValueValid = (value) => {
  if (isNotEmpty(value) && isNumber(value)) {
    return true;
  } else {
    return false;
  }
};
const LaptopPriceInput = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: LaptopPriceValue,
    valueHasError: LaptopPriceHasError,
    valueIsTouched: LaptopPriceIsTouched,
    valueChangeHandler: LaptopPriceChangeHandler,
    inputBlurHandler: LaptopPriceBlurHandler,
    setLocalStorage,
  } = UseInputAndSelect(isValueValid);

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("lapPrice");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage]);

  useEffect(() => {
    localStorage.setItem("lapPrice", JSON.stringify(LaptopPriceValue));
  }, [LaptopPriceValue]);

  //Function to take data to the parent component, including functions to blur
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "lapPrice",
      value: {
        inputValue: LaptopPriceValue,
        isvalid: !LaptopPriceHasError && LaptopPriceIsTouched,
        blur: LaptopPriceBlurHandler,
      },
    });
  }, [
    onTakeData,
    LaptopPriceValue,
    LaptopPriceHasError,
    LaptopPriceIsTouched,
    LaptopPriceBlurHandler,
  ]);

  //Variable to change  input classes depending on value validity.
  const lapPriceClasses = LaptopPriceHasError
    ? classes.invalidLaptopPrice
    : classes.LaptopPrice;

  return (
    <div className={lapPriceClasses}>
      <label>ლეპტოპის ფასი</label>
      <input
        type="text"
        placeholder="0000"
        value={LaptopPriceValue}
        onChange={LaptopPriceChangeHandler}
        onBlur={LaptopPriceBlurHandler}
      />
      <p>მხოლოდ ციფრები</p>
    </div>
  );
};

export default LaptopPriceInput;
