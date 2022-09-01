import { Fragment } from "react";

const OptionCpu = (props) => {
  return (
    <Fragment>
      <option value="CPU" disabled hidden>
        CPU
      </option>
      <option value={props.value}>{props.value}</option>;
    </Fragment>
  );
};

export default OptionCpu;
