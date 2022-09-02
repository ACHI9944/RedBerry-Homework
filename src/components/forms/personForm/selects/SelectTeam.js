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
    setLocalStorage
  } = UseInputAndSelect(isNotEmpty);

  //Using useffects to put input value in local storage and take it out when page refreshed  
  useEffect(() => {
    const storedValues = localStorage.getItem("team");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage]);

  useEffect(() => {
    localStorage.setItem("team", JSON.stringify(teamValue));
  }, [teamValue]);

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

  //setting variable to give selects position selected in localStorage
  const storedValues = localStorage.getItem("position");
  const parsed = JSON.parse(storedValues)
  const defaultvalue = parsed? parsed : 'თიმი'
  return (
    <select
      className={selectClasses}
      name="Team"
      defaultValue={defaultvalue}
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
