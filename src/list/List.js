import { useNavigate } from "react-router-dom";
import classes from "./List.module.css";
import laptop from "../pictures/laptop3.png";
import ListItems from "./ListItems";

/* import { useEffect, useState } from "react"; */

const DUMMYLIST = [
  {
    id: "i1",
    img: laptop,
    fullname: "არჩილი ახვლედიანი",
    name: "asus core ie7",
    more: "მეტის ნახვა",
  },
  {
    id: "i2",
    img: laptop,
    fullname: "არჩილი ახვლედიანი",
    name: "asus core ie7",
    more: "მეტის ნახვა",
  },
  {
    id: "i3",
    img: laptop,
    fullname: "არჩილი ახვლედიანი",
    name: "asus core ie7",
    more: "მეტის ნახვა",
  },
  {
    id: "i4",
    img: laptop,
    fullname: "არჩილი ახვლედიანი",
    name: "asus core ie7",
    more: "მეტის ნახვა",
  },
  {
    id: "i5",
    img: laptop,
    fullname: "არჩილი ახვლედიანი",
    name: "asus core ie7",
    more: "მეტის ნახვა",
  },
  {
    id: "i6",
    img: laptop,
    fullname: "არჩილი ახვლედიანი",
    name: "asus core ie7",
    more: "მეტის ნახვა",
  },
  {
    id: "i7",
    img: laptop,
    fullname: "არჩილი ახვლედიანი",
    name: "asus core ie7",
    more: "მეტის ნახვა",
  },
  {
    id: "i8",
    img: laptop,
    fullname: "არჩილი ახვლედიანი",
    name: "asus core ie7",
    more: "მეტის ნახვა",
  },
];

/* const url =
  "https://pcfy.redberryinternship.ge/api/laptops?token=aec11cf7c5d14402ee5d8e97bd29dfb6"; */

const List = () => {
  //const [data, setData] = useState([]);
  const navigate = useNavigate();
  const icon = <ion-icon name="chevron-back-outline"></ion-icon>;
  const goBack = () => {
    navigate("/main");
  };

  /* useEffect(() => {
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
  }, []); */

  return (
    <div className={classes.layer}>
      <button onClick={goBack}>{icon}</button>
      <h4>ჩანაწერების სია</h4>

      <ul className={classes.laptopList}>
        {DUMMYLIST.map((item) => (
          <ListItems
            key={item.id}
            img={item.img}
            fullname={item.fullname}
            name={item.name}
            more={item.more}
          />
        ))}
      </ul>
    </div>
  );
};

export default List;
