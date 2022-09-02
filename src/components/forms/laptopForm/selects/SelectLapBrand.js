import classes from "./SelectLapBrand.module.css";
import OptionLapBrand from "./OptionLapBrand";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import { useEffect } from "react";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;

const SelectLapBrand = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: LapBrandValue,
    valueChangeHandler: LapBrandChangeHandler,
    inputBlurHandler: LapBrandBlurHandler,
    valueHasError: LapBrandHasError,
    reset: resetLapBrand,
  } = UseInputAndSelect(isNotEmpty);

  //Function to take data to the parent component, including functions to blur and reset
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "LapBrand",
      value: {
        inputValue: LapBrandValue,
        isvalid: !LapBrandHasError,
        blur: LapBrandBlurHandler,
        reset: resetLapBrand,
      },
    });
  }, [
    LapBrandValue,
    LapBrandHasError,
    LapBrandBlurHandler,
    resetLapBrand,
    onTakeData,
  ]);

  //Variable to change  input classes depending on value validity.
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
