import UseInputAndSelect from '../../useHook/UseInputAndSelect';
import classes from './LaptopPriceInput.module.css'

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
const LaptopPriceInput = () => {
  const {
    value: LaptopPriceValue,
    valueHasError: LaptopPriceHasError,
    valueChangeHandler: LaptopPriceChangeHandler,
    inputBlurHandler: LaptopPriceBlurHandler,
    reset: resetLaptopPrice,
  } = UseInputAndSelect(isValueValid);
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
