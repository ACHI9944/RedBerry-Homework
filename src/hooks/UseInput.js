import { useEffect, useReducer, useState } from "react";

//Default functions for checking input validity
const isMoreThanTwoLetters = (value) => value.trim().length > 2;
const isGeorgian = (value) => {
  const regex = /[^\u10A0-\u10FF]/gi;
  const allGeorgian = value.trim().search(regex);
  if (allGeorgian) {
    return true;
  } else {
    return false;
  }
};

// Reducer for name and surname inputs
const initialInputState = {
  value: "",
  isTouched: false,
  isGeo: false,
  isMoreTwo: false,
  isValid: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: true,
      isGeo: isGeorgian(action.value),
      isMoreTwo: isMoreThanTwoLetters(action.value),
      isValid: isGeorgian(action.value) && isMoreThanTwoLetters(action.value),
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
      isGeo: state.isGeo,
      isMoreTwo: state.isMoreTwo,
      isValid: state.isValid,
    };
  }
  if (action.type === "RESET") {
    return {
      value: '',
      isTouched: false,
      isValid: false,
      isGeo: false,
      isMoreTwo: false,
    };
  }
  return initialInputState;
};

const UseInput = () => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };
  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  //Function to determine comment under inputs and whether it has error or not.

  const checker = function (state) {
    const valueHasError = !state.isValid && state.isTouched;
    let valueComment = <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>;
    if (!state.isGeo && state.isMoreTwo && state.isTouched) {
      valueComment = <p>გამოიყენე ქართული ასოები</p>;
    } else if (!state.isMoreTwo && state.isGeo && state.isTouched) {
      valueComment = <p>მინიმუმ 2 სიმბოლო</p>;
    } else if (!state.isValid && state.isTouched) {
      <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>;
    } else if (state.isValid && state.isTouched) {
      valueComment = <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>;
    }
    return { valueComment, valueHasError };
  };
  //destructuring checker function
  const { valueComment, valueHasError } = checker(inputState);

  //using useEffect to avoid unnecessary rerenderings while typing
  const [inputHasError, setInputHasError] = useState(false);
  useEffect(() => {
    const identifier = setTimeout(() => {
      setInputHasError(valueHasError);
    }, 1);
    return () => {
      clearTimeout(identifier);
    };
  }, [valueHasError]);

  return {
    value: inputState.value,
    comment: valueComment,
    hasError: inputHasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default UseInput;
