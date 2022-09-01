import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import OptionTeam from "./OptionTeam";
import classes from './SelectTeamAndPos.module.css'

const isNotEmpty = (value) => value.trim().length > 0;

const SelectTeam = (props) => {
  const {
    valueChangeHandler: teamChangeHandler,
    inputBlurHandler: teamBlurHandler,
    valueHasError: teamHasError,
    reset: resetTeam,
  } = UseInputAndSelect(isNotEmpty);

  const selectClasses = teamHasError ? classes.invalidSelect : classes.select;
  return (
    <select
      className={selectClasses}
      name="Team"
      defaultValue={"თიმი"}
      onChange={teamChangeHandler}
      onBlur={teamBlurHandler}
    >
      {props.team.map((item) => (
        <OptionTeam key={item.id} value={item.name} />
      ))}
    </select>
  );
};
export default SelectTeam;
