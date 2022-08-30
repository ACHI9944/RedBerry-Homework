import classes from "./ListItem.module.css";
import { useNavigate } from "react-router-dom";
import laptopimage from "../assets/pictures/laptop3.png";

const ListItem = () => {
  const navigate = useNavigate();
  const icon = <ion-icon name="chevron-back-outline"></ion-icon>;
  const goBack = () => {
    navigate("/list");
  };
  return (
    <div className={classes.layer}>
      <button onClick={goBack}>{icon}</button>
      <h4>ლეპტოპის ინფო</h4>
      <div className={classes.maindiv}>
        <div className={`${classes.underline}  ${classes.middlediv}`}>
          <div className={classes.littlediv}>
            <img src={laptopimage} alt="laptop"></img>
          </div>
          <div className={classes.littlediv}>
            <div className={classes.query}>
              <p>სახელი:</p>
              <p>თიმი:</p>
              <p>პოზიცია:</p>
              <p>მეილი</p>
              <p>ტელ. ნომერი</p>
            </div>
            <div className={classes.description}>
              <p>არჩილი</p>
              <p>ახვლედიანი</p>
              <p>დეველოპერი</p>
              <p>achi944@yahoo.com</p>
              <p>+995 583 45 28 33</p>
            </div>
          </div>
        </div>
        <div className={`${classes.underline}  ${classes.middlediv}`}>
          <div className={classes.littlediv}>
            <div className={classes.query}>
              <p>ლეპტოპის სახელი:</p>
              <p>ლეპტოპის ბრენდი:</p>
              <p>RAM:</p>
              <p>მეხსიერების ტიპი:</p>
            </div>
            <div className={classes.description}>
              <p>CORE I7</p>
              <p>INTEL</p>
              <p>16</p>
              <p>SSD</p>
            </div>
          </div>
          <div className={classes.littlediv}>
            <div className={classes.query}>
              <p>CPU:</p>
              <p>CPU-ს ბირთვი:</p>
              <p>CPU-ს</p>
            </div>
            <div className={classes.description}>
              <p>intel 5</p>
              <p>13</p>
              <p>67</p>
            </div>
          </div>
        </div>
        <div className={classes.middlediv}>
          <div className={classes.littlediv}>
            <div className={classes.query}>
              <p>ლეპტოპის მდგომარეობა:</p>
              <p>ლეპტოპის ფასი:</p>
            </div>
            <div className={classes.description}>
              <p>მეორადი</p>
              <p>2000 ₾</p>
            </div>
          </div>
          <div className={classes.littlediv}>
            <div className={classes.query}>
              <p>შევსების რიცხვი:</p>
            </div>
            <div className={classes.description}>
              <p>29.08.2022 </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
