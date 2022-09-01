import UseInputAndSelect from '../../useHook/UseInputAndSelect';
import classes from './CpuCoreInput.module.css'

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

const CpuCoreInput = () => {
  const {
    value: CpuCoreValue,
    valueHasError: CpuCoreHasError,
    valueChangeHandler: CpuCoreChangeHandler,
    inputBlurHandler: CpuCoreBlurHandler,
    reset: resetCpuCore,
  } = UseInputAndSelect(isValueValid);

  const numberClasses = CpuCoreHasError
    ? classes.invalidCpuCore
    : classes.CpuCore;

  return (
    <div className={numberClasses}>
      <label htmlFor="number">CPU-ს ბირთვი</label>

      <input
        type="text"
        id="number"
        onChange={CpuCoreChangeHandler}
        onBlur={CpuCoreBlurHandler}
        value={CpuCoreValue}
      />
      <p>მხოლოდ ციფრები</p>
    </div>
  );
};

export default CpuCoreInput;

/* input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
} */
