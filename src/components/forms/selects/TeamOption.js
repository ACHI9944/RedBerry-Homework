
import { Fragment } from "react";

const TeamOption = (props) => {
  return (
    <Fragment>
      <option value="თიმი"  disabled hidden>
        თიმი
      </option>
      <option value={props.value}>{props.value}</option>;
    </Fragment>
  );
};

export default TeamOption;
