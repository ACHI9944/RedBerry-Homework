import { useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import OptionTeam from "./OptionTeam";
import classes from "./SelectTeamAndPos.module.css";

const isNotEmpty = (value) => value.trim().length > 0;

const SelectTeam = (props) => {
  const {
    value: teamValue,
    valueChangeHandler: teamChangeHandler,
    inputBlurHandler: teamBlurHandler,
    valueHasError: teamHasError,
    reset: resetTeam,
  } = UseInputAndSelect(isNotEmpty);

  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "team",
      value: {
        inputValue: teamValue,
        isvalid: !teamHasError,
        blur: teamBlurHandler,
      },
    });
  }, [teamHasError, teamValue, onTakeData, teamBlurHandler]);

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
