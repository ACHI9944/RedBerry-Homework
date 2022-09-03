import { useCallback, useEffect, useState } from "react";
import classes from "./MemoryRadio.module.css";

const MemoryRadio = (props) => {
  //Fnction to controll input value and check.
  const [checked, setChecked] = useState({ ssd: false, hdd: false });
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    setChecked(() => {
      return {
        ssd: false,
        hdd: false,
        [event.target.value]: true,
      };
    });
  };

  //Function to reset input
  const reset = useCallback((event) => {
    setValue("");
    setChecked(() => {
      return {
        ssd: false,
        hdd: false,
      };
    });
  }, []);

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("memoryType");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setChecked(() => {
        return {
          ssd: parsed.ssd,
          hdd: parsed.hdd,
        };
      });
    } else return;
  }, [setChecked]);

  useEffect(() => {
    localStorage.setItem("memoryType", JSON.stringify(checked));
  }, [checked]);

  //Function to take data to the parent component, including functions to blur and reset
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "memoryRadio",
      value: {
        inputValue: value,
        reset: reset,
      },
    });
  }, [value, reset, onTakeData]);

  return (
    <div className={classes.memoryRadio}>
      <p>მეხსიერების ტიპი</p>
      <div className={classes.radios}>
        <input
          type="radio"
          name="memory"
          value="ssd"
          checked={checked.ssd}
          onChange={handleChange}
        />
        <label>SSD</label>
        <input
          type="radio"
          name="memory"
          value="hdd"
          checked={checked.hdd}
          onChange={handleChange}
        />
        <label>HDD</label>
      </div>
    </div>
  );
};
export default MemoryRadio;
