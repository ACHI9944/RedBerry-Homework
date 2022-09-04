import { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CpuCoreInput from "./inputs/CpuCoreInput";
import CpuStreamInput from "./inputs/CpuStreamInput";
import DateInput from "./inputs/DateInput";
import ImageInput from "./inputs/ImageInput";
import LapRamInput from "./inputs/LapRamInput";
import LaptopNameInput from "./inputs/LaptopNameInput";
import classes from "./LaptopForm.module.css";
import MemoryRadio from "./radios/MemoryRadio";
import SelectCpu from "./selects/SelectCpu";
import SelectLapBrand from "./selects/SelectLapBrand";
import LaptopPriceInput from "./inputs/LaptopPriceInput";
import Condition from "./radios/Condition";
import Button from "../../button/Button";
import useFetchDummy from "../../hooks/useFetchDummy";

//Links from api
const lapBrandsUrl = "https://pcfy.redberryinternship.ge/api/brands";
const cpusUrl = "https://pcfy.redberryinternship.ge/api/cpus";

const LaptopForm = (props) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/add/personform");
  };

  const backToPersonForm = () => {
    navigate("/add/personform");
  };

  //State for gathering all data from component inputs
  const [laptopValues, setlaptopValues] = useState({
    laptop_image: "",
    laptop_name: "",
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
  //function for merging incoming data to existing data in state
  const mergeData = useCallback((value) => {
    setlaptopValues((previousValues) => ({
      ...previousValues,
      [value.name]: value.value,
    }));
  }, []);

  //destructuring props
  const { onTakeData,} = props;

  //function for submitting form. to check validity of every single input
  const submitDataHandler = (event) => {
    event.preventDefault();
    if (
      laptopValues.laptop_image.isvalid &&
      laptopValues.laptop_name.isvalid &&
      laptopValues.laptop_brand_id.isvalid &&
      laptopValues.laptop_cpu.isvalid &&
      laptopValues.laptop_cpu_cores.isvalid &&
      laptopValues.laptop_cpu_threads.isvalid &&
      laptopValues.laptop_ram.isvalid &&
      laptopValues.laptop_hard_drive_type.isvalid &&
      laptopValues.laptop_state.isvalid &&
      laptopValues.laptop_purchase_date.isvalid &&
      laptopValues.laptop_price.isvalid
    ) {
      onTakeData(laptopValues);
    } else {
      laptopValues.laptop_image.blur();
      laptopValues.laptop_name.blur();
      laptopValues.laptop_brand_id.blur();
      laptopValues.laptop_cpu.blur();
      laptopValues.laptop_cpu_cores.blur();
      laptopValues.laptop_cpu_threads.blur();
      laptopValues.laptop_ram.blur();
      laptopValues.laptop_hard_drive_type.alert();
      laptopValues.laptop_state.alert();
      laptopValues.laptop_purchase_date.blur();
      laptopValues.laptop_price.blur();
    }
  };

  //Using custom hook and useEffect to fetch DUMMY data from api
  const { fetchData: fetchlaptopBrandData, data: laptopBrandData } =
    useFetchDummy();
  const { fetchData: fetchlaptopCpuData, data: laptopCpuData } =
    useFetchDummy();
  useEffect(() => {
    fetchlaptopBrandData(lapBrandsUrl);
    fetchlaptopCpuData(cpusUrl);
  }, [fetchlaptopBrandData, fetchlaptopCpuData]);
  return (
    <Fragment>
      <Button onBack={goBack} />
      <form className={classes.laptopForm} onSubmit={submitDataHandler}>
        <ImageInput onTakeData={mergeData} />
        <div className={classes.lapNameAndBrand}>
          <LaptopNameInput onTakeData={mergeData} />
          <SelectLapBrand lapBrands={laptopBrandData} onTakeData={mergeData} />
        </div>
        <div className={classes.aboutCpu}>
          <SelectCpu Cpus={laptopCpuData} onTakeData={mergeData} />
          <CpuCoreInput onTakeData={mergeData} />
          <CpuStreamInput onTakeData={mergeData} />
        </div>
        <div className={classes.ramAndType}>
          <LapRamInput onTakeData={mergeData} />
          <MemoryRadio onTakeData={mergeData} />
        </div>
        <div className={classes.dateAndPrice}>
          <DateInput onTakeData={mergeData} />
          <LaptopPriceInput onTakeData={mergeData} />
        </div>
        <Condition onTakeData={mergeData} />
        <div className={classes.lowerButtons}>
          <button className={classes.miniBackButton} onClick={backToPersonForm}>
            უკან
          </button>
          <button className={classes.saveButton}>დამახსოვრება</button>
        </div>
      </form>
    </Fragment>
  );
};

export default LaptopForm;
