import classes from "./SelectTeamAndPos.module.css";
import TeamOption from "./TeamOption";
const SelectTeam = (props) => {
  return (
    <select className={classes.select} name="Team" defaultValue={"თიმი"}>
      {props.team.map((item) => (
        <TeamOption key={item.id} value={item.name} />
      ))}
    </select>
  );
};
export default SelectTeam;
