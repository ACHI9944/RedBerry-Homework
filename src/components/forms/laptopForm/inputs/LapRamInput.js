
import UseInputAndSelect from '../../useHook/UseInputAndSelect';
import classes from './LapRamInput.module.css'

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

const LapRamInput = () => {
  const {
    value: LapRamValue,
    valueHasError: LapRamHasError,
    valueChangeHandler: LapRamChangeHandler,
    inputBlurHandler: LapRamBlurHandler,
    reset: resetLapRam,
  } = UseInputAndSelect(isValueValid);

  const lapRamClasses = LapRamHasError
    ? classes.invalidLapRam
    : classes.LapRam;

  return (
    <div className={lapRamClasses}>
      <label htmlFor="number">ლეპტოპის RAM (GB)</label>

      <input
        type="text"
        id="number"
        onChange={LapRamChangeHandler}
        onBlur={LapRamBlurHandler}
        value={LapRamValue}
      />
      <p>მხოლოდ ციფრები</p>
    </div>
  );
};

export default LapRamInput;