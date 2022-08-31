import { useEffect, useReducer, useState } from "react";

//Default functions for checking input validity

const emailEndsCorrectly = (value) => {
  const slicedValue = value.trim().slice(-12);
  const redberry = "@redberry.ge";
  if (redberry === slicedValue) {
    return true;
  } else {
    return false;
  }
};

// Reducer for Email input
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
      isValid: emailEndsCorrectly(action.value),
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

const UseEmailInput = () => {
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


  const valueComment = "უნდა მთავრდებოდეს @redberry.ge-ით";
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

export default UseEmailInput;
