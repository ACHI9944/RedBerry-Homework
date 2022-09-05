import { useNavigate } from "react-router-dom";
import classes from "./List.module.css";
import ListItems from "./ListItems";
import { Fragment, useEffect, useState } from "react";
import Button from "../button/Button";
import LoadingSpinner from "../Spinner/LoadingSpinner";

const List = (props) => {
  const url = `https://pcfy.redberryinternship.ge/api/laptops?token=${props.mainToken}`;
  const icon = <ion-icon name="chevron-back-outline"></ion-icon>;
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/main");
  };
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result.data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.warn(e);
      }
    };
    fetchData();
  }, [url]);

  console.log(data)
  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading &&
        <div>
          <Button className={classes.back} onBack={goBack}>
            {icon}
          </Button>
          <div className={classes.layer}>
            <h4>ჩანაწერების სია</h4>

            <ul className={classes.laptopList}>
              {data.map((item) => (
                <ListItems
                  mainToken={props.mainToken}
                  id={item.laptop.id}
                  key={item.laptop.id}
                  img={item.laptop.image}
                  fullname={`${item.user.name} ${item.user.surname}`}
                  lapName={item.laptop.name}
                />
              ))}
            </ul>
          </div>{" "}
        </div>
      }
    </Fragment>
  );
};

export default List;
