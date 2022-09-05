import { Fragment, useState } from "react";
import ListItem from "./ListITem";
import classes from "./ListItems.module.css";

const ListItems = (props) => {
  const { mainToken, id,img, fullname, lapName } = props;

  const [isShowingInfo, setIsShowingInfo] = useState(false);

  const viewMore = () => {
    setIsShowingInfo(true);
  };

  const viewLess = () => {
    setIsShowingInfo(false);
  };

  return (
    <Fragment>
      {isShowingInfo && <ListItem mainToken={mainToken} id={id} onBackToList={viewLess} />}
      <li className={classes.listItem}>
        <div className={classes.image}>
          <img src={`https://pcfy.redberryinternship.ge/${img}`} alt="img"></img>
        </div>
        <div className={classes.description}>
          <p className={classes.names}>{fullname}</p>
          <p className={classes.names}>{lapName}</p>
          <p className={classes.button} onClick={viewMore}>მეტის ნახვა</p>
        </div>
      </li>
    </Fragment>
  );
};

export default ListItems;
