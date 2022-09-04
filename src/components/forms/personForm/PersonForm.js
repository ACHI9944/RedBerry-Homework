import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../button/Button";
import useFetchDummy from "../../hooks/useFetchDummy";
import EmailInput from "./inputs/EmailInput";
import FirstNameInput from "./inputs/FirstNameInput";
import LastNameInput from "./inputs/LastNameInput";
import NumberInput from "./inputs/NumberInput";
import classes from "./PersonForm.module.css";
import SelectPosition from "./selects/SelectPosition";
import SelectTeam from "./selects/SelectTeam";

//Links from api
const teamsUrl = "https://pcfy.redberryinternship.ge/api/teams";
const positionsUrl = "https://pcfy.redberryinternship.ge/api/positions";

const PersonForm = (props) => {
  const navigate = useNavigate();

  //function on button for going back to main
  const goBack = () => {
    localStorage.clear();
    navigate("/main");
  };

  //State for gathering all data from component inputs
  const [personValues, setPersonValues] = useState({
    name: "",
    surname: "",
    team_id: "",
    position_id: "",
    email: "",
    phone_number: "",
  });


  //function for merging incoming data to existing data in state
  const mergeData = useCallback(
    (value) => {
      setPersonValues((previousValues) => ({
        ...previousValues,
        [value.name]: value.value,
      }));
    },
    [setPersonValues]
  );
  const { onTakeData } = props;

  //function for submitting form. to check validity of every single input
  const submitDataHandler = (event) => {
    event.preventDefault();
    if (
      personValues.name.isvalid &&
      personValues.surname.isvalid &&
      personValues.team_id.isvalid &&
      personValues.position_id.isvalid &&
      personValues.email.isvalid &&
      personValues.phone_number.isvalid
    ) {
      onTakeData(personValues);
      navigate("/add/laptopForm");
    } else {
      personValues.name.blur();
      personValues.surname.blur();
      personValues.team_id.blur();
      personValues.position_id.blur();
      personValues.email.blur();
      personValues.phone_number.blur();
    }
  };

  //Using custom hook and useEffect to fetch DUMMY data from api
  const { fetchData: fetchTeamData, data: teamData } = useFetchDummy();
  const { fetchData: fetchPositionData, data: PositionData } = useFetchDummy();
  useEffect(() => {
    fetchPositionData(positionsUrl);
    fetchTeamData(teamsUrl);
  }, [fetchTeamData, fetchPositionData]);

  //function to controll which positions to be rendered
  const positionChangeHandler = (posdata) => {
    return PositionData.filter((item) => item.team_id === posdata);
  };
  const positionsData = positionChangeHandler(personValues.team_id.inputValue);

  
  return (
    <Fragment>
      <Button onBack={goBack} />
      <form className={classes.personform} onSubmit={submitDataHandler}>
        <div className={classes.fullname}>
          <FirstNameInput onTakeData={mergeData} />
          <LastNameInput onTakeData={mergeData} />
        </div>
        <SelectTeam team={teamData} onTakeData={mergeData} />
        <SelectPosition positions={positionsData} onTakeData={mergeData} />
        <EmailInput onTakeData={mergeData} />
        <NumberInput onTakeData={mergeData} />
        <div className={classes.forwardButton}>
          <button>შემდეგი</button>
        </div>
      </form>
    </Fragment>
  );
};

export default PersonForm;
