import { useEffect, useReducer, useState } from "react";


//Default functions for checking input validity
const isNotEmpty = (value) => value.trim().length > 0;

// Reducer for team select
const initialSelectState = {
  value: "",
  isTouched: false,
  isValid: false,
};

const selectStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: true,
      isValid: isNotEmpty(action.value),
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
  return initialSelectState;
};

const UseSelect = () => {
  const [selectState, dispatch] = useReducer(
    selectStateReducer,
    initialSelectState
  );

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };
  const valueBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };



  const valueHasError = !selectState.isValid && selectState.isTouched

  //using useEffect to avoid unnecessary rerenderings while selecting
  const [inputHasError, setInputHasError] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setInputHasError(valueHasError);
    }, 1);
    return () => {
      clearTimeout(identifier);
    };
  }, [valueHasError,]);


  return {
    valueChangeHandler,
    valueBlurHandler,
    valueHasError: inputHasError,
    reset,
  };
};

export default UseSelect