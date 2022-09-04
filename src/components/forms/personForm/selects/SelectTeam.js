import { Fragment, useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import OptionTeam from "./OptionTeam";
import classes from "./SelectTeamAndPos.module.css";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;

const SelectTeam = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: teamValue,
    valueHasError: teamHasError,
    valueIsTouched: teamIsTouched,
    valueChangeHandler: teamChangeHandler,
    inputBlurHandler: teamBlurHandler,
    setLocalStorage,
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

  // function to controll team id, then to controll positions
  const teamId = (value) => {
    if (value === "დეველოპერი") {
      return 1;
    } else if (value === "HR") {
      return 2;
    } else if (value === "გაყიდვები") {
      return 3;
    } else if (value === "დიზაინი") {
      return 4;
    } else if (value === "მარკეტინგი") {
      return 5;
    } else return;
  };

  //Function to take data to the parent component, including functions to blur
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "team_id",
      value: {
        inputValue: teamId(teamValue),
        isvalid: !teamHasError && teamIsTouched,
        blur: teamBlurHandler,
      },
    });
  }, [teamHasError, teamValue, onTakeData, teamIsTouched, teamBlurHandler]);

  //Variable to change  input classes depending on value validity.
  const selectClasses = teamHasError ? classes.invalidSelect : classes.select;

  //setting variable to give selects position selected in localStorage
  const storedValues = localStorage.getItem("position");
  const parsed = JSON.parse(storedValues);
  const defaultvalue = parsed ? parsed : "თიმი";
  return (
    <select
      className={selectClasses}
      name="Team"
      defaultValue={defaultvalue}
      onChange={teamChangeHandler}
      onBlur={teamBlurHandler}
    >
      <option value="თიმი" disabled hidden>
        თიმი
      </option>
      {props.team.map((item) => (
        <OptionTeam key={item.id} value={item.name} />
      ))}
    </select>
  );
};
export default SelectTeam;
