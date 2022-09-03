import { useCallback, useEffect, useState } from "react";
import classes from "./Condition.module.css";

//Function to determine value validity
const isNotEmpty = (value) => {
  return value.length > 0;
};
const Condition = (props) => {
  //Fnction to controll input value and check.
  const [value, setValue] = useState("");
  // variable for value validity
  const valueIsValid = isNotEmpty(value);

  // function for alerting user if radio input is empty
  const [conditionClass, setMemoryClass] = useState(classes.condition);
  const alert = useCallback(() => {
    if (!valueIsValid) {
      setMemoryClass(classes.invalidCondition);
    } else {
      setMemoryClass(classes.condition);
    }
  }, [valueIsValid]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("value");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setValue(parsed);
    } else return;
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("value", JSON.stringify(value));
  }, [value]);

  //Function to take data to the parent component, including
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "ConditionRadio",
      value: {
        inputValue: value,
        isvalid: valueIsValid,
        alert,
      },
    });
  }, [value, onTakeData, alert, valueIsValid]);

  return (
    <div className={conditionClass}>
      <p>ლეპტოპის მდგომარეობა</p>
      <div className={classes.radios}>
        <input
          type="radio"
          name="condition"
          value="ახალი"
          onChange={handleChange}
        />
        <label>ახალი</label>
        <input
          type="radio"
          name="condition"
          value="მეორადი"
          onChange={handleChange}
        />
        <label>მეორადი</label>
      </div>
    </div>
  );
};

export default Condition;
