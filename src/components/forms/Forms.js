import { Navigate, Route, Routes } from "react-router-dom";
import FormLayout from "../formLayout/FormLayout";
import LaptopForm from "./LaptopForm";
import PersonForm from "./PersonForm";




const Forms = () => {
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
  return (
    <FormLayout>
      <Routes>
        <Route path="/" element={<Navigate to="personform" />} />
        <Route path="personform" element={<PersonForm team={team} positions={positions} />} />
        <Route path="laptopForm" element={<LaptopForm />} />
      </Routes>
    </FormLayout>
  );
};
export default Forms;
