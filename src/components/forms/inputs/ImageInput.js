import React from "react";
import classes from "./ImageInput.module.css";

const ImageInput = () => {
  const imageChangeHandler = (event) => {
    
    console.log(event.target.files[0])
  };
 
  return (
    <div className={classes.image}>
      <p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
      <label htmlFor="file-upload" defaultValue={"asdasd"}>
        ატვირთე
      </label>
      <input id="file-upload" type="file" onChange={imageChangeHandler}></input>
    </div>
  );
};

export default ImageInput;
