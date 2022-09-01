import { useState } from "react";
import classes from "./MemoryRadio.module.css";

const MemoryRadio = () => {
  const [value, setValue] = useState('')
  const handleChange = (event) => {
      setValue(event.target.value)
  }
  console.log(value)
  return (
    <div className={classes.memoryRadio}>
      <p>მეხსიერების ტიპი</p>
      <div className={classes.radios}>
          <input type="radio"  name="memory" value="ssd" onChange={handleChange}/>
          <label >SSD</label>
          <input type="radio"  name="memory" value="hdd" onChange={handleChange}/>
          <label >HDD</label>
      </div>
    </div>
  );
};
export default MemoryRadio;
