import { Fragment } from "react";
import OptionPosition from "./OptionPosition";
import OptionTeam from "./OptionTeam";


const SelectTeamAndPos = () => {



//Function to take data to the parent component, including functions to blur
const { onTakeData } = props;
useEffect(() => {
  onTakeData(
    {
      name: "team_id",
      value: {
        inputValue: teamId(teamValue),
        isvalid: !teamHasError && teamIsTouched,
        blur: teamBlurHandler,
      },
    },
    {
      name: "position_id",
      value: {
        inputValue: positionValue,
        isvalid: !positionHasError && positionIsTouched,
        blur: positionBlurHandler,
      },
    }
  );
}, [teamHasError, teamValue, onTakeData, teamIsTouched, teamBlurHandler]);

//setting variable to give selects position selected in localStorage
const storedValues = localStorage.getItem("position");
const parsed = JSON.parse(storedValues);
const defaultvalue = parsed ? parsed : "თიმი";

//setting variable to give selects position selected in localStorage
const storedValues = localStorage.getItem("position");
const parsed = JSON.parse(storedValues);
const defaultvalue = parsed ? parsed : "პოზიცია";

  return (
    <Fragment>
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
      <select
        className={selectClasses}
        name="pos"
        defaultValue={defaultvalue}
        onChange={positionChangeHandler}
        onBlur={positionBlurHandler}
      >
        {props.positions.map((item) => (
          <OptionPosition key={item.id} value={item.name} />
        ))}
      </select>
    </Fragment>
  );
};

export default SelectTeamAndPos;
