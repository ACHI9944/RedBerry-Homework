import { useEffect, useState } from "react";
import UseInputAndSelect from "../../../hooks/UseInputAndSelect";
import OptionTeam from "./OptionTeam";
import classes from "./SelectTeamAndPos.module.css";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;

const SelectTeam = (props) => {
  //Destructuring props
  const { onTakeData, team } = props;

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

  // function to determine team id
  const idFinder = (value) => {
    const idObj = team.filter((item) => item.name === value);
    if (idObj.length > 0) {
      return idObj[0].id;
    } else {
      return "";
    }
  };
  const identifiedId = idFinder(teamValue);

  //Function to take data to the parent component, including functions to blur

  useEffect(() => {
    onTakeData({
      name: "team_id",
      value: {
        inputValue: identifiedId,
        isvalid: !teamHasError && teamIsTouched,
        blur: teamBlurHandler,
      },
    });
  }, [
    teamHasError,
    teamValue,
    onTakeData,
    teamIsTouched,
    teamBlurHandler,
    identifiedId,
  ]);

  //Variable to change  input classes depending on value validity.
  const selectClasses = teamHasError ? classes.invalidSelect : classes.select;

  //Variable to set starting value
  const defaultValue = teamValue? teamValue : 'თიმი'

  return (
    <select
      className={selectClasses}
      name="Team"
      value={defaultValue}
      onChange={teamChangeHandler}
      onBlur={teamBlurHandler}
    >
      <option id="Team" disabled hidden>
        თიმი
      </option>
      {props.team.map((item) => (
        <OptionTeam key={item.id} value={item.name} />
      ))}
    </select>
  );
};
export default SelectTeam;
