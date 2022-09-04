import { Fragment, useCallback, useState } from "react";
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
import Completed from "../../completed/Completed";

const LaptopForm = (props) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const goBack = () => {
    navigate("/add/personform");
  };

  const backToPersonForm = () => {
    navigate("/add/personform");
  };

  //State for gathering all data from component inputs
  const [laptopValues, setlaptopValues] = useState({
    laptop_image: '',
    laptop_name: '',
    laptop_brand_id: '',
    laptop_cpu: '',
    laptop_cpu_cores: '',
    laptop_cpu_threads: '',
    laptop_ram: '',
    laptop_hard_drive_type: '',
    laptop_state: '',
    laptop_purchase_date: '',
    laptop_price: '',
  });

  //function for merging incoming data to existing data in state
  const mergeData = useCallback((value) => {
    setlaptopValues((previousValues) => ({
      ...previousValues,
      [value.name]: value.value,
    }));
  }, []);

  //destructuring props
  const { onTakeData, lapBrands, Cpus } = props;

  //function for submitting form. to check validity of every single input
  const submitDataHandler = (event) => {
    event.preventDefault();
    if (
      laptopValues.img.isvalid &&
      laptopValues.lapName.isvalid &&
      laptopValues.LapBrand.isvalid &&
      laptopValues.cpu.isvalid &&
      laptopValues.cpucore.isvalid &&
      laptopValues.cpustream.isvalid &&
      laptopValues.lapram.isvalid &&
      laptopValues.date.isvalid &&
      laptopValues.lapPrice.isvalid &&
      laptopValues.ConditionRadio.isvalid &&
      laptopValues.memoryRadio.isvalid
    ) {
      setModal(true);
      onTakeData(laptopValues);
      /* navigate("/added"); */
    } else {
      laptopValues.img.blur();
      laptopValues.lapName.blur();
      laptopValues.LapBrand.blur();
      laptopValues.cpu.blur();
      laptopValues.cpucore.blur();
      laptopValues.cpustream.blur();
      laptopValues.lapram.blur();
      laptopValues.date.blur();
      laptopValues.lapPrice.blur();
      laptopValues.ConditionRadio.alert();
      laptopValues.memoryRadio.alert();
    }
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <Fragment>
      {modal && <Completed onCloseModal={closeModal} />}
      <Button onBack={goBack} />
      <form className={classes.laptopForm} onSubmit={submitDataHandler}>
        <ImageInput onTakeData={mergeData} />
        <div className={classes.lapNameAndBrand}>
          <LaptopNameInput onTakeData={mergeData} />
          <SelectLapBrand lapBrands={lapBrands} onTakeData={mergeData} />
        </div>
        <div className={classes.aboutCpu}>
          <SelectCpu Cpus={Cpus} onTakeData={mergeData} />
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
