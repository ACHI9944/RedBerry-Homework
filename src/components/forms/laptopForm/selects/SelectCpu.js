import { useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import OptionCpu from "./OptionCpu";
import classes from "./SelectCpu.module.css";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;

const SelectCpu = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: CpuValue,
    valueHasError: CpusHasError,
    valueChangeHandler: CpusChangeHandler,
    inputBlurHandler: CpusBlurHandler,
    reset: resetCpus,
  } = UseInputAndSelect(isNotEmpty);

  //Function to take data to the parent component, including functions to blur and reset
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "cpu",
      value: {
        inputValue: CpuValue,
        isvalid: !CpusHasError,
        blur: CpusBlurHandler,
        reset: resetCpus,
      },
    });
  }, [CpuValue, CpusHasError, CpusBlurHandler, resetCpus, onTakeData]);

  //Variable to change  input classes depending on value validity.
  const selectClasses = CpusHasError ? classes.invalidCpus : classes.Cpus;
  return (
    <select
      className={selectClasses}
      name="CPU"
      defaultValue={"CPU"}
      onChange={CpusChangeHandler}
      onBlur={CpusBlurHandler}
    >
      {props.Cpus.map((item) => (
        <OptionCpu key={item.id} value={item.name} />
      ))}
    </select>
  );
};

export default SelectCpu;
