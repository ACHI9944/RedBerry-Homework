import { useState } from "react";
import classes from "./Condition.module.css";

const Condition = () => {
    const [value, setValue] = useState('')
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    console.log(value)
  return (
    <div className={classes.condition}>
      <p>ლეპტოპის მდგომარეობა</p>
      <div className={classes.radios}>
          <input type="radio" name="condition" value="new" onChange={handleChange}/>
          <label>ახალი</label>
          <input type="radio" name="condition" value="used" onChange={handleChange}/>
          <label>მეორადი</label>
      </div>
    </div>
  );
};

export default Condition;
