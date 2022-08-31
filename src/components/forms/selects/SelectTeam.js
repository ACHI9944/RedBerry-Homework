import UseSelect from "../../../hooks/UseSelect";
import OptionTeam from "./OptionTeam";
import classes from './SelectTeamAndPos.module.css'

const SelectTeam = (props) => {
  const {
    valueChangeHandler: teamChangeHandler,
    valueBlurHandler: teamBlurHandler,
    valueHasError: teamHasError,
    reset: resetTeam,
  } = UseSelect();

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
