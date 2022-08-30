
import { Fragment } from "react";

const PositionOption = (props) => {
  return (
    <Fragment>
      <option value="პოზიცია" disabled hidden>
        პოზიცია
      </option>
      <option value={props.value}>{props.value}</option>;
    </Fragment>
  );
};

export default PositionOption;
