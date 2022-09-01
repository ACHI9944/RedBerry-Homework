import classes from "./SelectLapBrand.module.css";
import OptionLapBrand from "./OptionLapBrand";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";

const isNotEmpty = (value) => value.trim().length > 0;

const SelectLapBrand = (props) => {
  const {
    valueChangeHandler: LapBrandChangeHandler,
    inputBlurHandler: LapBrandBlurHandler,
    valueHasError: LapBrandHasError,
    reset: resetLapBrand,
  } = UseInputAndSelect(isNotEmpty);

  const selectClasses = LapBrandHasError
    ? classes.invalidLapBrand
    : classes.LapBrand;
  return (
    <select
      className={selectClasses}
      name="lapBrand"
      defaultValue={"ლეპტოპის ბრენდი"}
      onChange={LapBrandChangeHandler}
      onBlur={LapBrandBlurHandler}
    >
      {props.lapBrands.map((item) => (
        <OptionLapBrand key={item.id} value={item.name} />
      ))}
    </select>
  );
};

export default SelectLapBrand;
