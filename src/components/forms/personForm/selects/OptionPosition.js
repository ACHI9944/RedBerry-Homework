
import { Fragment } from "react";

const OptionPosition = (props) => {
  return (
    <Fragment>
      <option value="პოზიცია" disabled hidden>
        პოზიცია
      </option>
      <option value={props.value}>{props.value}</option>;
    </Fragment>
  );
};

export default OptionPosition;
