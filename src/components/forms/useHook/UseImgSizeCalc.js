const UseImgSizeCalc = (value) => {
  const valueSize = value.toString()
  if (valueSize.length === 10) {
    return  `${valueSize.slice(0, 1)} gb`;
  } else if (valueSize.length === 9) {
    return `${valueSize.slice(0, 3)} mb`;
  } else if (valueSize.length === 8) {
    return `${valueSize.slice(0, 2)} mb`;
  } else if (valueSize.length === 7) {
    return `${valueSize.slice(0, 1)} mb`;
  } else if (valueSize.length === 6) {
    return `${valueSize.slice(0, 3)} kb`;
  } else if (valueSize.length === 5) {
    return `${valueSize.slice(0, 2)} kb`;
  } else if (valueSize.length === 4) {
    return `${valueSize.slice(0, 1)} kb`;
  } else if (valueSize.length === 3) {
    return `${valueSize.slice(0, 3)} b`;
  } else if (valueSize.length === 2) {
    return `${valueSize.slice(0, 2)} b`;
  }else if (valueSize.length === 1) {
    return `${valueSize.slice(0, 1)} b`;
  }
};

export default UseImgSizeCalc;
