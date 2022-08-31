import { useEffect, useReducer, useState } from "react";

//Default functions for checking input validity
const isLatinWithNums = (value) => {
  const regex = /[^a-zA-Z0-9$@$!%*?&#^-_. +]+$/gi;
  const inputIsNormal = value.trim().search(regex);
  if (inputIsNormal) {
    return true;
  } else {
    return false;
  }
};

// Reducer for name and surname inputs
const initialInputState = {
  value: "",
  isTouched: false,
  isValid: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: true,
      isValid: isLatinWithNums(action.value)
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
      isValid: state.isValid,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
      isValid: false,
    };
  }
  return initialInputState;
};

const UseLaptopNameInput = () => {
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

  const valueComment = "ლათინური ასოები, ციფრები, !@#$%^&*()_+=";
  const valueHasError = !inputState.isValid && inputState.isTouched

  //using useEffect to avoid unnecessary rerenderings while typing
  const [inputHasError, setInputHasError] = useState(false);
  const [inputcomment, setInputComment] = useState(null);
  useEffect(() => {
    const identifier = setTimeout(() => {
      setInputHasError(valueHasError);
      setInputComment(valueComment);
    }, 1);
    return () => {
      clearTimeout(identifier);
    };
  }, [valueHasError, valueComment]);

  return {
    value: inputState.value,
    comment: inputcomment,
    valueHasError: inputHasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default UseLaptopNameInput;
