import { useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import OptionTeam from "./OptionTeam";
import classes from "./SelectTeamAndPos.module.css";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;

const SelectTeam = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: teamValue,
    valueChangeHandler: teamChangeHandler,
    inputBlurHandler: teamBlurHandler,
    valueHasError: teamHasError,
    reset: resetTeam,
  } = UseInputAndSelect(isNotEmpty);

  //Function to take data to the parent component, including functions to blur and reset
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "team",
      value: {
        inputValue: teamValue,
        isvalid: !teamHasError,
        blur: teamBlurHandler,
        reset: resetTeam,
      },
    });
  }, [teamHasError, teamValue, onTakeData, teamBlurHandler, resetTeam]);

  //Variable to change  input classes depending on value validity.
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
