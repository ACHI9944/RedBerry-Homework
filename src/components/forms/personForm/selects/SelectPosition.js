import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import OptionPosition from "./OptionPosition";
import classes from './SelectTeamAndPos.module.css'


const isNotEmpty = (value) => value.trim().length > 0;

const SelectPosition = (props) => {
  const {
    valueChangeHandler: positionChangeHandler,
    inputBlurHandler: positionBlurHandler,
    valueHasError: teamHasError,
    reset: resetPosition,
  } = UseInputAndSelect(isNotEmpty);

  const selectClasses = teamHasError ? classes.invalidSelect : classes.select;

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
