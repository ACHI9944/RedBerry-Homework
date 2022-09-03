import { useCallback, useEffect, useState } from "react";
import classes from "./MemoryRadio.module.css";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;

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

  // variable to controll if user checked input or not
  const isInvalid = !isNotEmpty(value);

  //Function to reset input
  const reset = useCallback((event) => {
    event.preventDefault();
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
      console.log(parsed)
      setChecked(() => {
        return {
          ssd: parsed.ssd,
          hdd: parsed.hdd
        }
      });
    } else return;
  }, [setChecked]);

  useEffect(() => {
    localStorage.setItem("memoryType", JSON.stringify(checked));
  }, [checked]);

  //Function to change radio class on submitting form if input is invalid
  const inavlidClass = classes.invalidmemoryRadio;
  const validClass = classes.memoryRadio;
  const [radioClass, setRadioClass] = useState(validClass);
  const alertMemoryRadio = useCallback(
    (event) => {
      setRadioClass(inavlidClass);
    },
    [inavlidClass]
  );

  //Function to take data to the parent component, including functions to blur and reset
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "memoryRadio",
      value: {
        inputValue: value,
        isvalid: !isInvalid,
        blur: alertMemoryRadio,
        reset: reset,
      },
    });
  }, [
    value,
    isInvalid,
    alertMemoryRadio,
    reset,
    onTakeData,
  ]);

  return (
    <div className={radioClass}>
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
