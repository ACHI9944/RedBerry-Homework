import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "./inputs/EmailInput";
import FirstNameInput from "./inputs/FirstNameInput";
import LastNameInput from "./inputs/LastNameInput";
import NumberInput from "./inputs/NumberInput";

import classes from "./PersonForm.module.css";
import SelectPosition from "./selects/SelectPosition";
import SelectTeam from "./selects/SelectTeam";



const PersonForm = (props) => {
  const navigate = useNavigate();
  const icon = <ion-icon name="chevron-back-outline"></ion-icon>;
  const goBack = () => {
    navigate("/main");
  };

  const forwardToNextInfo = () => {
    navigate("/add/laptopForm");
  };

  //function for form submiting
  const submitDataHandler = () => {
    return;
  };

  return (
    <Fragment>
      <button onClick={goBack} className={classes.backButton}>
        {icon}
      </button>
      <form className={classes.personform} onSubmit={submitDataHandler}>
        <div className={classes.fullname}>
          <FirstNameInput />
          <LastNameInput />
        </div>
        <SelectTeam team={props.team}/>
        <SelectPosition positions={props.positions}/>
        <EmailInput />
        <NumberInput />
        <div className={classes.forwardButton}>
          <button onClick={forwardToNextInfo}>შემდეგი</button>
        </div>
      </form>
    </Fragment>
  );
};

export default PersonForm;
