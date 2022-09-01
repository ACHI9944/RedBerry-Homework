import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import OptionCpu from "./OptionCpu";

import classes from "./SelectCpu.module.css";

const isNotEmpty = (value) => value.trim().length > 0;

const SelectCpu = (props) => {
  const {
    valueChangeHandler: CpusChangeHandler,
    inputBlurHandler: CpusBlurHandler,
    valueHasError: CpusHasError,
    reset: resetCpus,
  } = UseInputAndSelect(isNotEmpty);

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
