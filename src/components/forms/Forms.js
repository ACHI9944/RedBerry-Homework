import React, { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import FormLayout from "../formLayout/FormLayout";
import LaptopForm from "./laptopForm/LaptopForm";
import PersonForm from "./personForm/PersonForm";


//Functioon for fetching all data
const lapCreateUrl = "https://pcfy.redberryinternship.ge/api/laptop/create";
const handleSubmit = async (url, data) => {
  try {
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    const response = await fetch(url, requestOptions);
    const jsonData = await response.json();
    
    //console.log(jsonData);
  } catch (error) {
    console.log('Something Went Wrong')
  }
};

const Forms = (props) => {
  const navigate = useNavigate()

  //All inputs gathered in one object
  const [values, setValues] = useState({
    name: "",
    surname: "",
    team_id: "",
    position_id: "",
    email: "",
    token: props.mainToken,
    phone_number: "",
    laptop_name: "",
    laptop_image: "",
    laptop_brand_id: "",
    laptop_cpu: "",
    laptop_cpu_cores: "",
    laptop_cpu_threads: "",
    laptop_ram: "",
    laptop_hard_drive_type: "",
    laptop_state: "",
    laptop_purchase_date: "",
    laptop_price: "",
  });

  //uploading all data
  const fetchAll = () => {
    handleSubmit(lapCreateUrl, values)
    navigate("/added"); 
    localStorage.clear()
  }

  //Using local storage not to lose data on refreshing
  useEffect(() => {
    const storedValues = localStorage.getItem("allValues");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setValues(parsed);
    } else return;
  }, [setValues]);

  useEffect(() => {
    localStorage.setItem("allValues", JSON.stringify(values));
  }, [values]);


  //bringing data from both: Laptopform, Personform, also deactivating button while merging
  const [isReadyForSubmit, setIsReadyForSubmit] = useState(true);
  const onTakeData = useCallback(
    (broughtValue) => {
      setIsReadyForSubmit(false)
      for (const key in broughtValue) {
        setValues((previousValues) => ({
          ...previousValues,
          [key]: broughtValue[key].inputValue,
        }));
      }
      setIsReadyForSubmit(true)
    },
    [setValues]


  );

  return (
    <FormLayout>
      <Routes>
        <Route path="/" element={<Navigate to="personform" />} />
        <Route
          path="personform"
          element={<PersonForm onTakeData={onTakeData} />}
        />
        <Route
          path="laptopForm"
          element={
            <LaptopForm
              onTakeData={onTakeData}
              isReady={isReadyForSubmit}
              submitToFetch={fetchAll}
            />
          }
        />
      </Routes>
    </FormLayout>
  );
};
export default Forms;
