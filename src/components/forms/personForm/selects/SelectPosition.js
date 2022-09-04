import { useEffect } from "react";
import UseInputAndSelect from "../../../hooks/UseInputAndSelect";
import OptionPosition from "./OptionPosition";
import classes from "./SelectTeamAndPos.module.css";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;

const SelectPosition = (props) => {
  //Destructuring props
  const { onTakeData, positions } = props;

  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: positionValue,
    valueChangeHandler: positionChangeHandler,
    valueIsTouched: positionIsTouched,
    inputBlurHandler: positionBlurHandler,
    valueHasError: positionHasError,
    setLocalStorage,
  } = UseInputAndSelect(isNotEmpty);

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("position");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage]);

  useEffect(() => {
    localStorage.setItem("position", JSON.stringify(positionValue));
  }, [positionValue]);

  // function to determine position id
  const idFinder = (value) => {
    const idObj = positions.filter((item) => item.name === value);
    if (idObj.length > 0) {
      return idObj[0].id;
    } else {
      return "";
    }
  };
  
  const identifiedId = idFinder(positionValue);

  //Function to take data to the parent component, including functions to blur
  useEffect(() => {
    onTakeData({
      name: "position_id",
      value: {
        inputValue: identifiedId,
        isvalid: !positionHasError && positionIsTouched,
        blur: positionBlurHandler,
      },
    });
  }, [
    positionHasError,
    positionValue,
    onTakeData,
    positionIsTouched,
    positionBlurHandler,
    identifiedId,
  ]);

  //Variable to change  input classes depending on value validity.
  const selectClasses = positionHasError
    ? classes.invalidSelect
    : classes.select;

    //Variable to set starting value
  const defaultValue = positionValue? positionValue : 'პოზიცია'

  return (
    <select
      className={selectClasses}
      name="pos"
      value={defaultValue}
      onChange={positionChangeHandler}
      onBlur={positionBlurHandler}
    >
      <option value="pozition" disabled hidden>
        პოზიცია
      </option>
      {props.positions.map((item) => (
        <OptionPosition key={item.id} value={item.name} />
      ))}
    </select>
  );
};
export default SelectPosition;
