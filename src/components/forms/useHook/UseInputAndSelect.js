import { useCallback, useEffect, useReducer, useState } from "react";


// Reducer for Email input
const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: true };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  } if(action.type === 'local') {
    return { value: action.value, isTouched:false}
  }
  return initialInputState;
};

const UseInputAndSelect = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };
  const inputBlurHandler = useCallback((event) => {
    dispatch({ type: "BLUR" });
  },[]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  },[]);

  const setLocalStorage = useCallback((event) => {
    dispatch({type: 'local', value:event})
  },[])

  const valueIsValid = validateValue(inputState.value)
  const valueHasError = !valueIsValid && inputState.isTouched;
  

  //using useEffect to avoid unnecessary rerenderings while typing
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
    value: inputState.value,
    valueHasError: inputHasError,
    valueIsTouched: inputState.isTouched,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    setLocalStorage,
  };
};

export default UseInputAndSelect;
