import { useNavigate } from "react-router-dom";
import classes from "./List.module.css";
import laptop from "../pictures/laptop2.png";
import ListItems from "./ListItems";

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
    id: "i4",
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
];

const List = () => {
  const navigate = useNavigate();
  const icon = <ion-icon name="chevron-back-outline"></ion-icon>;
  const goBack = () => {
    navigate("/main");
  };
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
