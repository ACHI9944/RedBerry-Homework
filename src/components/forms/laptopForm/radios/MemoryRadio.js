import { useCallback, useEffect, useState } from "react";
import classes from "./MemoryRadio.module.css";

//Function to determine value validity
const isNotEmpty = (value) => {
  return value.length > 0;
};

const MemoryRadio = (props) => {
  //Fnction to controll input value
  const [value, setValue] = useState("");

  // variable for value validity
  const valueIsValid = isNotEmpty(value);

  // function for alerting user if radio input is empty
  const [memoryClass , setMemoryClass] = useState(classes.memoryRadio)
  const alert = useCallback(() => {
    if(!valueIsValid) {
      setMemoryClass(classes.invalidmemoryRadio)
    } else {
      setMemoryClass(classes.memoryRadio)
    }
  },[valueIsValid])

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("memoryType");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setValue(parsed);
    } else return;
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("memoryType", JSON.stringify(value));
  }, [value]);

  //Function to take data to the parent component, including functions to blur
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "memoryRadio",
      value: {
        inputValue: value,
        isvalid: valueIsValid,
        alert,
      },
    });
  }, [value, onTakeData, valueIsValid,alert]);

  
  return (
    <div className={memoryClass}>
      <p>მეხსიერების ტიპი</p>
      <div className={classes.radios}>
        <input type="radio" name="memory" value="ssd" onChange={handleChange} />
        <label>SSD</label>
        <input type="radio" name="memory" value="hdd" onChange={handleChange} />
        <label>HDD</label>
      </div>
    </div>
  );
};
export default MemoryRadio;
