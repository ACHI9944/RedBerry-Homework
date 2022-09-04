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
    valueHasError: LapBrandHasError,
    valueIsTouched: LapBrandIsTouched,
    valueChangeHandler: LapBrandChangeHandler,
    inputBlurHandler: LapBrandBlurHandler,
    setLocalStorage,
  } = UseInputAndSelect(isNotEmpty);

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("lapBrand");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage]);

  useEffect(() => {
    localStorage.setItem("lapBrand", JSON.stringify(LapBrandValue));
  }, [LapBrandValue]);

  //Function to take data to the parent component, including functions to blur
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "LapBrand",
      value: {
        inputValue: LapBrandValue,
        isvalid: !LapBrandHasError && LapBrandIsTouched,
        blur: LapBrandBlurHandler,
      },
    });
  }, [
    onTakeData,
    LapBrandValue,
    LapBrandHasError,
    LapBrandIsTouched,
    LapBrandBlurHandler,
  ]);

  //Variable to change  input classes depending on value validity.
  const selectClasses = LapBrandHasError
    ? classes.invalidLapBrand
    : classes.LapBrand;

  //setting variable to give selects position selected in localStorage
  const storedValues = localStorage.getItem("lapBrand");
  const parsed = JSON.parse(storedValues);
  const defaultvalue = parsed ? parsed : "ლეპტოპის ბრენდი";
  return (
    <select
      className={selectClasses}
      name="laptop_brand_id"
      defaultValue={defaultvalue}
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
