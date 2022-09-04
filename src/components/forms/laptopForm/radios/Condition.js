import { useCallback, useEffect, useState } from "react";
import classes from "./Condition.module.css";

//Function to determine value validity
const isNotEmpty = (value) => {
  return value.length > 0;
};
const Condition = (props) => {
  //Fnction to controll input value and check.
  const [conditionvalue, setConditionValue] = useState("");
  // variable for value validity
  const valueIsValid = isNotEmpty(conditionvalue);

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
    setConditionValue(event.target.value);
  };

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("value");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setConditionValue(parsed);
    } else return;
  }, [setConditionValue]);

  useEffect(() => {
    localStorage.setItem("value", JSON.stringify(conditionvalue));
  }, [conditionvalue]);

  //Function to take data to the parent component, including
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "laptop_state",
      value: {
        inputValue: conditionvalue,
        isvalid: valueIsValid,
        alert,
      },
    });
  }, [conditionvalue, onTakeData, alert, valueIsValid]);


  // Function for getting checked value not to lose checked after refreshing
  const checkChecker = (value) => {
    let checkedNew = false;
    let checkedUsed = false;
    if (value === "ახალი") {
      checkedNew = true;
      checkedUsed = false;
    } else if (value === "მეორადი") {
      checkedUsed = true;
      checkedNew = false;
    }
    return { checkedNew, checkedUsed };
  };

  const {checkedNew , checkedUsed} = checkChecker(conditionvalue)
  return (
    <div className={conditionClass}>
      <p>ლეპტოპის მდგომარეობა</p>
      <div className={classes.radios}>
        <input
          type="radio"
          name="condition"
          value="ახალი"
          onChange={handleChange}
          checked={checkedNew}
        />
        <label>ახალი</label>
        <input
          type="radio"
          name="condition"
          value="მეორადი"
          onChange={handleChange}
          checked={checkedUsed}
        />
        <label>მეორადი</label>
      </div>
    </div>
  );
};

export default Condition;
