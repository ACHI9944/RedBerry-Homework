import React, { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FormLayout from "../formLayout/FormLayout";
import LaptopForm from "./laptopForm/LaptopForm";
import PersonForm from "./personForm/PersonForm";

const Forms = () => {
  const lapBrands = [
    {
      id: 1,
      name: "HP",
    },
    {
      id: 2,
      name: "Dell",
    },
    {
      id: 3,
      name: "Microsoft",
    },
    {
      id: 4,
      name: "Apple",
    },
    {
      id: 5,
      name: "Lenovo",
    },
    {
      id: 6,
      name: "Acer",
    },
  ];
  const team = [
    {
      id: 1,
      name: "დეველოპერი",
    },
    {
      id: 2,
      name: "HR",
    },
    {
      id: 3,
      name: "გაყიდვები",
    },
    {
      id: 4,
      name: "დიზაინი",
    },
    {
      id: 5,
      name: "მარკეგინგი",
    },
  ];
  const positions = [
    {
      id: 1,
      name: "ინტერნი",
      teams_id: 1,
    },
    {
      id: 2,
      name: "HR ბიზნეს დეველოპერი",
      teams_id: 3,
    },
  ];
  const Cpus = [
    {
      id: 1,
      name: "Intel Core i3",
    },
    {
      id: 2,
      name: "Intel Core i5",
    },
    {
      id: 3,
      name: "Intel Core i7",
    },
    {
      id: 4,
      name: "Intel Core i9",
    },
    {
      id: 5,
      name: "AMD Ryzen 3",
    },
  ];
  const [values, setValues] = useState({
    firstname: {},
    lastName: {},
    team: {},
    position: {},
    email: {},
    number: {},
    lapName: {},
    LapBrand: {},
    cpu: {},
    cpucore: {},
    cpustream: {},
    lapram: {},
    date: {},
    lapPrice: {},
    memoryRadio: {},
    ConditionRadio: {},
  });

  
  useEffect(() => {
    const storedValues = localStorage.getItem("allValues");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setValues(parsed);
    } else return;
  }, [setValues,]);

  useEffect(() => {
    localStorage.setItem("allValues", JSON.stringify(values));
  }, [values]);


  const onTakeData =  useCallback(
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
  console.log(values);

  return (
    <FormLayout>
      <Routes>
        <Route path="/" element={<Navigate to="personform" />} />
        <Route
          path="personform"
          element={
            <PersonForm
              team={team}
              positions={positions}
              onTakeData={onTakeData}
            />
          }
        />
        <Route
          path="laptopForm"
          element={
            <LaptopForm
              lapBrands={lapBrands}
              Cpus={Cpus}
              onTakeData={onTakeData}
            />
          }
        />
      </Routes>
    </FormLayout>
  );
};
export default Forms;
