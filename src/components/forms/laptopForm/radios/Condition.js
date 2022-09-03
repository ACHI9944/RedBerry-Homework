import { useCallback, useEffect, useState } from "react";
import classes from "./Condition.module.css";

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

  //Function to reset input
  const reset = useCallback(() => {
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
          used: parsed.used,
        };
      });
    } else return;
  }, [setChecked]);

  useEffect(() => {
    localStorage.setItem("condition", JSON.stringify(checked));
  }, [checked]);

  //Function to take data to the parent component, including reset
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "ConditionRadio",
      value: {
        inputValue: value,
        reset: reset,
      },
    });
  }, [value, reset, onTakeData]);

  return (
    <div className={classes.condition}>
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
