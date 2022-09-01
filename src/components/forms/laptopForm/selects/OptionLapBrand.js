import { Fragment } from "react";

const OptionLapBrand = (props) => {
  return (
    <Fragment>
      <option value="ლეპტოპის ბრენდი" disabled hidden>
        ლეპტოპის ბრენდი
      </option>
      <option value={props.value}>{props.value}</option>;
    </Fragment>
  );
};

export default OptionLapBrand;
