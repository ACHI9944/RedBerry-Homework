import { useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import OptionPosition from "./OptionPosition";
import classes from "./SelectTeamAndPos.module.css";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;

const SelectPosition = (props) => {
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

  //Function to take data to the parent component, including functions to blur
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "position",
      value: {
        inputValue: positionValue,
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
  ]);

  //Variable to change  input classes depending on value validity.
  const selectClasses = positionHasError
    ? classes.invalidSelect
    : classes.select;

  //setting variable to give selects position selected in localStorage
  const storedValues = localStorage.getItem("position");
  const parsed = JSON.parse(storedValues);
  const defaultvalue = parsed ? parsed : "პოზიცია";
  return (
    <select
      className={selectClasses}
      name="pos"
      defaultValue={defaultvalue}
      onChange={positionChangeHandler}
      onBlur={positionBlurHandler}
    >
      {props.positions.map((item) => (
        <OptionPosition key={item.id} value={item.name} />
      ))}
    </select>
  );
};
export default SelectPosition;
