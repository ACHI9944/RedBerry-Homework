
import { Fragment } from "react";

const OptionTeam = (props) => {
  return (
    <Fragment>
      <option value="თიმი"  disabled hidden>
        თიმი
      </option>
      <option value={props.value}>{props.value}</option>;
    </Fragment>
  );
};

export default OptionTeam;
