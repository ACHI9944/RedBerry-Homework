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
    inputBlurHandler: positionBlurHandler,
    valueHasError: positionHasError,
    reset: resetPosition,
  } = UseInputAndSelect(isNotEmpty);

  //Function to take data to the parent component, including functions to blur and reset
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "position",
      value: {
        inputValue: positionValue,
        isvalid: !positionHasError,
        blur: positionBlurHandler,
        reset: resetPosition,
      },
    });
  }, [
    positionHasError,
    positionValue,
    onTakeData,
    positionBlurHandler,
    resetPosition,
  ]);

  //Variable to change  input classes depending on value validity.
  const selectClasses = positionHasError
    ? classes.invalidSelect
    : classes.select;

  return (
    <select
      className={selectClasses}
      name="pos"
      defaultValue={"პოზიცია"}
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
