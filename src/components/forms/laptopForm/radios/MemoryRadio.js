import { useCallback, useEffect, useState } from "react";
import classes from "./MemoryRadio.module.css";

//Function to determine value validity
const isNotEmpty = (value) => {
  return value.length > 0;
};

const MemoryRadio = (props) => {
  //Fnction to controll input value
  const [memoryValue, setMemoryValue] = useState("");

  // variable for value validity
  const valueIsValid = isNotEmpty(memoryValue);

  // function for alerting user if radio input is empty
  const [memoryClass, setMemoryClass] = useState(classes.memoryRadio);
  const alert = useCallback(() => {
    if (!valueIsValid) {
      setMemoryClass(classes.invalidmemoryRadio);
    } else {
      setMemoryClass(classes.memoryRadio);
    }
  }, [valueIsValid]);

  const handleChange = (event) => {
    setMemoryValue(event.target.value);
  };

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("memoryType");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setMemoryValue(parsed);
    } else return;
  }, [setMemoryValue]);

  useEffect(() => {
    localStorage.setItem("memoryType", JSON.stringify(memoryValue));
  }, [memoryValue]);


  //Function to take data to the parent component, including functions to blur
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "laptop_hard_drive_type",
      value: {
        inputValue: memoryValue,
        isvalid: valueIsValid,
        alert,
      },
    });
  }, [memoryValue, onTakeData, valueIsValid, alert]);


  // Function for getting checked value not to lose checked after refreshing
  const checkChecker = (value) => {

    let checkedSsd = false;
    let checkedHdd = false;
    if (value === "SSD") {
      checkedSsd = true;
      checkedHdd = false;
    } else if (value === "HDD") {
      checkedHdd = true;
      checkedSsd = false;
    }
    return { checkedSsd, checkedHdd };
  };

  const { checkedSsd, checkedHdd } = checkChecker(memoryValue);

  return (
    <div className={memoryClass}>
      <p>მეხსიერების ტიპი</p>
      <div className={classes.radios}>
        <input
          type="radio"
          name="memory"
          value="SSD"
          onChange={handleChange}
          checked={checkedSsd}
        />
        <label>SSD</label>
        <input
          type="radio"
          name="memory"
          value="HDD"
          onChange={handleChange}
          checked={checkedHdd}
        />
        <label>HDD</label>
      </div>
    </div>
  );
};
export default MemoryRadio;
