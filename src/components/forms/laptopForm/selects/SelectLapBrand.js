import classes from "./SelectLapBrand.module.css";
import OptionLapBrand from "./OptionLapBrand";
import { useEffect } from "react";
import UseInputAndSelect from "../../../hooks/UseInputAndSelect";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;

const SelectLapBrand = (props) => {
  const { onTakeData, lapBrands } = props;

  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: LapBrandValue,
    valueHasError: LapBrandHasError,
    valueIsTouched: LapBrandIsTouched,
    valueChangeHandler: LapBrandChangeHandler,
    inputBlurHandler: LapBrandBlurHandler,
    setLocalStorage
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

  // function to determine team id
  const idFinder = (value) => {
    const idObj = lapBrands.filter((item) => item.name === value);
    if (idObj.length > 0) {
      return idObj[0].id;
    } else {
      return "";
    }
  };
  const identifiedId = idFinder(LapBrandValue);

  //Function to take data to the parent component, including functions to blur
  useEffect(() => {
    onTakeData({
      name: "laptop_brand_id",
      value: {
        inputValue: identifiedId,
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
    identifiedId,
  ]);

  //Variable to change  input classes depending on value validity.
  const selectClasses = LapBrandHasError
    ? classes.invalidLapBrand
    : classes.LapBrand;

    //Variable to set starting value
  const defaultValue = LapBrandValue? LapBrandValue : 'ლეპტოპის ბრენდი'
  return (
    <select
      className={selectClasses}
      name="laptop_brand_id"
      value={defaultValue}
      onChange={LapBrandChangeHandler}
      onBlur={LapBrandBlurHandler}
    >
      <option value="ლეპტოპის ბრენდი" disabled hidden>
        ლეპტოპის ბრენდი
      </option>
      {props.lapBrands.map((item) => (
        <OptionLapBrand key={item.id} value={item.name} />
      ))}
    </select>
  );
};

export default SelectLapBrand;
