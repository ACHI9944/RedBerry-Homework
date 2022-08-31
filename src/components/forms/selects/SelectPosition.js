import UseSelect from "../../../hooks/UseSelect";
import OptionPosition from "./OptionPosition";
import classes from './SelectTeamAndPos.module.css'

const SelectPosition = (props) => {
  const {
    valueChangeHandler: positionChangeHandler,
    valueBlurHandler: positionBlurHandler,
    valueHasError: teamHasError,
    reset: resetPosition,
  } = UseSelect();

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
