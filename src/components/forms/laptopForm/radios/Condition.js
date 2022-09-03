import { useCallback, useEffect, useState } from "react";
import classes from "./Condition.module.css";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;

const Condition = (props) => {
  //Fnction to controll input value and check.
  const [checked, setChecked] = useState({ new: false, used: false });
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    setChecked(() => {
      return {
        new: false,
        used: false,
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
        new: false,
        used: false,
      };
    });
  }, []);

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("condition");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setChecked(() => {
        return {
          new: parsed.new,
          used: parsed.used
        }
      });
    } else return;
  }, [setChecked]);

  useEffect(() => {
    localStorage.setItem("condition", JSON.stringify(checked));
  }, [checked]);

  //Function to change radio class on submitting form if input is invalid
  const inavlidClass = classes.invalidCondition;
  const validClass = classes.condition;
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
      name: "ConditionRadio",
      value: {
        inputValue: value,
        isvalid: !isInvalid,
        blur: alertMemoryRadio,
        reset: reset,
      },
    });
  }, [value, isInvalid, alertMemoryRadio, reset, onTakeData]);

 

  return (
    <div className={radioClass}>
      <p>ლეპტოპის მდგომარეობა</p>
      <div className={classes.radios}>
        <input
          type="radio"
          name="condition"
          value="new"
          onChange={handleChange}
          checked={checked.new}
        />
        <label>ახალი</label>
        <input
          type="radio"
          name="condition"
          value="used"
          onChange={handleChange}
          checked={checked.used}
        />
        <label>მეორადი</label>
      </div>
    </div>
  );
};

export default Condition;
