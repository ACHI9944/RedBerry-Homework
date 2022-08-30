import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import UseEmailInput from "../hooks/UseEmailInput";
import UseInput from "../hooks/UseInput";
import UseNumberInput from "../hooks/UseNumberInput";
import classes from "./PersonForm.module.css";
import PositionOption from "./PositionOption";
import TeamOption from "./TeamOption";

const PersonForm = (props) => {
  const navigate = useNavigate();
  const icon = <ion-icon name="chevron-back-outline"></ion-icon>;
  const goBack = () => {
    navigate("/main");
  };

  const forwardToNextInfo = () => {
    navigate("/add/laptopForm");
  };

  //destructuring custom hooks that are made for form validations
  const {
    value: firstNameValue,
    comment: firstNameComment,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = UseInput();

  const {
    value: lastNameValue,
    comment: lastNameComment,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetlastName,
  } = UseInput();
  const {
    value: emailValue,
    comment: emailComment,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = UseEmailInput();

  const {
    value: numberValue,
    comment: numberComment,
    hasError: numberHasError,
    valueChangeHandler: numberChangeHandler,
    inputBlurHandler: numberBlurHandler,
    reset: resetnumber,
  } = UseNumberInput();

  //queries for dynamic classes
  const firstNameClasses = firstNameHasError
    ? classes.invalidnames
    : classes.names;

  const lastNameClasses = lastNameHasError
    ? classes.invalidnames
    : classes.names;

  const emailClasses = emailHasError ? classes.invalidEmail : classes.email;

  const numberClasses = numberHasError ? classes.invalidNumber : classes.number;
  const submitDataHandler = () => {
    return
  }

  return (
    <Fragment>
      <button onClick={goBack} className={classes.backButton}>
        {icon}
      </button>
      <form className={classes.personform} onSubmit={submitDataHandler}>
        <div className={classes.fullname}>
          <div className={firstNameClasses}>
            <label htmlFor="name">სახელი</label>
            <input
              type="text"
              id="name"
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              value={firstNameValue}
            />
            {firstNameComment}
          </div>
          <div className={lastNameClasses}>
            <label htmlFor="surname">გვარი</label>
            <input
              type="text"
              id="surname"
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              value={lastNameValue}
            />
            {lastNameComment}
          </div>
        </div>
        <select className={classes.select} name="Team" defaultValue={"თიმი"}>
          {props.team.map((item) => (
            <TeamOption key={item.id} value={item.name} />
          ))}
        </select>

        <select className={classes.select} name="pos" defaultValue={"პოზიცია"}>
          {props.positions.map((item) => (
            <PositionOption key={item.id} value={item.name} />
          ))}
        </select>
        <div className={emailClasses}>
          <label htmlFor="email">მეილი</label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={emailValue}
          />
          {emailComment}
        </div>
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
        <div className={classes.forwardButton}>
          <button onClick={forwardToNextInfo}>შემდეგი</button>
        </div>
      </form>
    </Fragment>
  );
};

export default PersonForm;
