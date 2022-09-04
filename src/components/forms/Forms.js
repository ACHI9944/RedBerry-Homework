import React, { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import FormLayout from "../formLayout/FormLayout";
import LaptopForm from "./laptopForm/LaptopForm";
import PersonForm from "./personForm/PersonForm";

const Forms = () => {
  const DOMAIN =
    "https://pcfy.redberryinternship.ge/api/laptops?token=3611f593d38f29d39f136e29ea6ccce0.json";
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    surname: "",
    team_id: "",
    position_id: "",
    email: "",
    token: "3611f593d38f29d39f136e29ea6ccce0",
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

  useEffect(() => {
    if (Object.values(values).every((x) => x)) {
      console.log(values);
    }
  }, [values /* navigate */]);

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

  const onTakeData = useCallback(
    (broughtValue) => {
      for (const key in broughtValue) {
        setValues((previousValues) => ({
          ...previousValues,
          [key]: broughtValue[key].inputValue,
        }));
      }
    },
    [setValues]
  );

  const handleSubmit = async (url, data) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      /* const response =  */ await fetch(url, requestOptions);
      //const igi = await response.json()
      // save data to state
    } catch (error) {
      console.log(error);
    }
  };
  const ait = () => {
    handleSubmit(DOMAIN, values);
  };

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
          element={<LaptopForm onTakeData={onTakeData} />}
        />
      </Routes>
      <button onClick={ait}>ait</button>
    </FormLayout>
  );
};
export default Forms;
