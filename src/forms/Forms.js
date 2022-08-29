import { Navigate, Route, Routes } from "react-router-dom";
import FormLayout from "../formLayout/FormLayout";

import LaptopForm from "./LaptopForm";
import PersonForm from "./PersonForm";

const Forms = () => {
  return (
    <FormLayout>
      <Routes>
        <Route path="/" element={<Navigate to="personform" />} />
        <Route path="personform" element={<PersonForm />} />
        <Route path="laptopForm" element={<LaptopForm />} />
      </Routes>
    </FormLayout>
  );
};
export default Forms;
