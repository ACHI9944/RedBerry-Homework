import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import classes from "./CpuStreamInput.module.css";

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

const CpuStreamInput = () => {
  const {
    value: CpuStreamValue,
    valueHasError: CpuStreamHasError,
    valueChangeHandler: CpuStreamChangeHandler,
    inputBlurHandler: CpuStreamBlurHandler,
    reset: resetCpuStream,
  } = UseInputAndSelect(isValueValid);

  const numberClasses = CpuStreamHasError
    ? classes.invalidCpuStream
    : classes.CpuStream;

  return (
    <div className={numberClasses}>
      <label htmlFor="number">CPU-ს ნაკადი</label>

      <input
        type="text"
        id="number"
        onChange={CpuStreamChangeHandler}
        onBlur={CpuStreamBlurHandler}
        value={CpuStreamValue}
      />
      <p>მხოლოდ ციფრები</p>
    </div>
  );
};

export default CpuStreamInput;
