import { useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import OptionPosition from "./OptionPosition";
import classes from "./SelectTeamAndPos.module.css";

const isNotEmpty = (value) => value.trim().length > 0;

const SelectPosition = (props) => {
  const {
    value: positionValue,
    valueChangeHandler: positionChangeHandler,
    inputBlurHandler: positionBlurHandler,
    valueHasError: positionHasError,
    reset: resetPosition,
  } = UseInputAndSelect(isNotEmpty);

  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "position",
      value: {
        inputValue: positionValue,
        isvalid: !positionHasError,
        blur: positionBlurHandler,
      },
    });
  }, [positionHasError, positionValue, onTakeData, positionBlurHandler]);

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
