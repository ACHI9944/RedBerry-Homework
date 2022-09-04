import { useNavigate } from "react-router-dom";
import classes from "./List.module.css";
import laptop from "../../assets/pictures/laptop3.png";
import ListItems from "./ListItems";
import { Fragment, useEffect, useState } from "react";
import Button from "../button/Button";

const url =
  "https://pcfy.redberryinternship.ge/api/laptops/?token=29a08a8a214129fffd8bcd90030906a6";

const List = () => {
  const icon = <ion-icon name="chevron-back-outline"></ion-icon>;
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/main");
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();

        setData(result.data);
      } catch (e) {
        console.warn(e);
      }
    };
    fetchData();

  }, []);
  return (
    <Fragment>
      <Button onBack={goBack}>{icon}</Button>
      <div className={classes.layer}>
        <h4>ჩანაწერების სია</h4>

        <ul className={classes.laptopList}>
          {data.map((item) => (
            <ListItems
              key={item.laptop.id}
              img={item.laptop.img}
              fullname={`${item.user.name} ${item.user.surname}`}
              name={item.laptop.name}
              more={item.more}
            />
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default List;
