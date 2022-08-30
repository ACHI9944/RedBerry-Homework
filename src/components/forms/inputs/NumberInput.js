import UseNumberInput from "../../../hooks/UseNumberInput";


const NumberInput = () => {
  const {
    value: numberValue,
    comment: numberComment,
    valueChangeHandler: numberChangeHandler,
    inputBlurHandler: numberBlurHandler,
    reset: resetnumber,
    numberClasses,
  } = UseNumberInput();

  return (
    <div className={numberClasses}>
      <label htmlFor="email">ტელეფონის ნომერი</label>

      <input
        type="text"
        id="number"
        onChange={numberChangeHandler}
        onBlur={numberBlurHandler}
        value={numberValue}
      />
      {numberComment}
    </div>
  );
};

export default NumberInput;
