import classes from "./ListItems.module.css";

const ListItems = (props) => {
  return (
    <li className={classes.listItem}>
      <div className={classes.image}>
        <img src={props.img} alt="img"></img>
      </div>
      <div className={classes.description}>
        <p>{props.fullname}</p>
        <p>{props.name}</p>
        <p className={classes.button}>{props.more}</p>
      </div>
    </li>
  );
};

export default ListItems;
