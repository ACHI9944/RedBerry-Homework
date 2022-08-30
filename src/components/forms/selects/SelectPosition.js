import PositionOption from "./PositionOption";
import classes from "./SelectTeamAndPos.module.css";

const SelectPosition = (props) => {
  return (
    <select className={classes.select} name="pos" defaultValue={"პოზიცია"}>
      {props.positions.map((item) => (
        <PositionOption key={item.id} value={item.name} />
      ))}
    </select>
  );
};
export default SelectPosition;
