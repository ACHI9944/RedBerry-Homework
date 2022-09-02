import React, { Fragment, useCallback, useEffect, useState } from "react";
import classes from "./ImageInput.module.css";
import alertImage from "../../../../assets/pictures/alertimg.PNG";
import doneImg from "../../../../assets/pictures/doneImg.PNG";
import UseImgSizeCalc from "../../useHook/UseImgSizeCalc";

//function for Checking input validity
const isNotEmpty = (value) => value.length > 0;

const ImageInput = (props) => {
  const [img, setImg] = useState("");
  const imageChangeHandler = (event) => {
    setImg(event.target.files[0]);
  };
  // variable to controll if user checked input or not
  const isInvalid = !isNotEmpty(img);

  //Function to reset input
  const reset = useCallback((event) => {
    event.preventDefault();
    setImg("");
  }, []);
  //Function to change radio class on submitting form if input is invalid
  const inavlidClass = classes.invalidImage;
  const validClass = classes.image;
  const [imgClass, setImgClass] = useState(validClass);
  const alertImg = useCallback(
    (event) => {
      setImgClass(inavlidClass);
    },
    [inavlidClass]
  );

  //Function to take data to the parent component, including functions to blur and reset
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "img",
      value: {
        inputValue: img,
        isvalid: !isInvalid,
        blur: alertImg,
        reset: reset,
      },
    });
  }, [img, isInvalid, alertImg, reset, onTakeData]);

  const beforeUploadImg = (
    <div className={imgClass}>
      {" "}
      <img src={alertImage} alt="alertImg"></img>
      <p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
      <label htmlFor="file-upload" defaultValue={"asdasd"}>
        ატვირთე
      </label>
      <input id="file-upload" type="file" onChange={imageChangeHandler}></input>
    </div>
  );

  return (
    <Fragment>
      {img && (
        <div className={classes.uploadedDiv}>
          <img
            className={classes.upladedImg}
            src={URL.createObjectURL(img)}
            alt="asd"
          ></img>
          <div className={classes.uploadedLowerdiv}>
            <div className={classes.uploadedDetails}>
              <img src={doneImg} alt="done"></img>
              <label>{`${img.name},`}</label>
              <p>{UseImgSizeCalc(img.size)}</p>
            </div>
            <button>თავიდან ატვირთე</button>
          </div>
        </div>
      )}
      {!img && beforeUploadImg}
    </Fragment>
  );
};

export default ImageInput;
