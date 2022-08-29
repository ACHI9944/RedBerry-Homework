import { useNavigate } from "react-router-dom";
import classes from "./ListItems.module.css";

const ListItems = (props) => {
  const navigate = useNavigate();

  const viewMore = () => {
    navigate('/listitem')
    
  };
  return (
    <li className={classes.listItem}>
      <div className={classes.image}>
        <img src={props.img} alt="img"></img>
      </div>
      <div className={classes.description}>
        <p className={classes.names}>{props.fullname}</p>
        <p className={classes.names}>{props.name}</p>
        <p className={classes.button} onClick={viewMore}>
          {props.more}
        </p>
      </div>
    </li>
  );
};

export default ListItems;
