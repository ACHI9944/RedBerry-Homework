import classes from "./ListItem.module.css";
import laptopimage from "../../assets/pictures/laptop3.png";
import { Fragment, useEffect, useState } from "react";

//brought dummy data for finding team and position. sorry,out of time
const teamData = [
  {
    id: 1,
    name: "დეველოპერი",
  },
  {
    id: 2,
    name: "HR",
  },
  {
    id: 3,
    name: "გაყიდვები",
  },
  {
    id: 4,
    name: "დიზაინი",
  },
  {
    id: 5,
    name: "მარკეგინგი",
  },
];
const positionData = [
  {
    id: 1,
    name: "ინტერნი",
    team_id: 1,
  },
  {
    id: 2,
    name: "ჯუნიორ დეველოპერი",
    team_id: 1,
  },
  {
    id: 3,
    name: "მიდლ დეველოპერი",
    team_id: 1,
  },
  {
    id: 4,
    name: "სენიორ დეველოპერი",
    team_id: 1,
  },
  {
    id: 5,
    name: "ლიდ დეველოპერი",
    team_id: 1,
  },
  {
    id: 6,
    name: "HR სპეციალისტი",
    team_id: 2,
  },
  {
    id: 7,
    name: "HR პროექტ მენეჯერი",
    team_id: 2,
  },
  {
    id: 8,
    name: "HR ბიზნეს პარტნიორი",
    team_id: 2,
  },
  {
    id: 9,
    name: "ჯუნიორ ბიზნეს დეველოპერი",
    team_id: 3,
  },
  {
    id: 10,
    name: "ბიზნეს დეველოპერი",
    team_id: 3,
  },
  {
    id: 11,
    name: "სენიორ ბიზნეს დეველოპერი",
    team_id: 3,
  },
  {
    id: 12,
    name: "ჯუნიორ UI/UX დიზაინერი",
    team_id: 4,
  },
  {
    id: 13,
    name: "UI/UX დიზაინერი",
    team_id: 4,
  },
  {
    id: 14,
    name: "სენიორ UI/UX დიზაინერი",
    team_id: 4,
  },
  {
    id: 15,
    name: "ლიდ UI/UX დიზაინერი",
    team_id: 4,
  },
  {
    id: 16,
    name: "ბლოგერი",
    team_id: 5,
  },
  {
    id: 17,
    name: "growth მარკეტინგის სპეციალისტი",
    team_id: 5,
  },
  {
    id: 18,
    name: "მარკეტინგის თიმ ლიდი",
    team_id: 5,
  },
];


const ListItem = (props) => {
  const { mainToken, id, onBackToList } = props;
  const url = `https://pcfy.redberryinternship.ge/api/laptop/${id}?token=${mainToken}`;
  const icon = <ion-icon name="chevron-back-outline"></ion-icon>;
  const goBack = () => {
    onBackToList();
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


  //Functions to find set some data in states, then using useEffect not to have error while rendering
  const teamChangeHandler = (teamdata) => {
    const data = teamData.filter((item) => item.id === teamdata);
    return data[0].name;
  };
  const positionChangeHandler = (posdata) => {
    const data = positionData.filter((item) => item.id === posdata);
    return data[0].name;
  };
  const conditionChangeHandler = (condition) => {
    if (condition === "used") {
      return "მეორადი";
    } else {
      return "ახალი";
    }
  };
  const [filteredpos, setfilteredpos] = useState("");
  const [filteredteam, setfilteredteam] = useState("");
  const [condition, setCondition] = useState("");
  const [imgUrl, setImgUrl] = useState('')
  
  useEffect(() => {
    if (!isLoading) {
      setfilteredpos(positionChangeHandler(data.user.position_id));
      setfilteredteam(teamChangeHandler(data.user.team_id));
      setCondition(conditionChangeHandler(data.laptop.state));
      setImgUrl(data.laptop.image)
    }
  }, [isLoading, data]);

  return (
    <Fragment>
      {!isLoading && (
        <div className={classes.layer}>
          <button className={classes.button} onClick={goBack}>{icon}</button>
          <h4>ლეპტოპის ინფო</h4>
          <div className={classes.maindiv}>
            <div className={`${classes.underline}  ${classes.middlediv}`}>
              <div className={classes.littlediv}>
                <img src={`https://pcfy.redberryinternship.ge/${imgUrl}`} alt="laptop"></img>
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
                  <p>{`${data.user.name} ${data.user.surname}`}</p>
                  <p>{filteredteam}</p>
                  <p>{filteredpos}</p>
                  <p>{data.user.email}</p>
                  <p>{data.user.phone_number}</p>
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
                  <p>{data.laptop.name}</p>
                  <p>{data.laptop.brand_id}</p>
                  <p>{data.laptop.ram}</p>
                  <p>{data.laptop.hard_drive_type}</p>
                </div>
              </div>
              <div className={classes.littlediv}>
                <div className={classes.query}>
                  <p>CPU:</p>
                  <p>CPU-ს ბირთვი:</p>
                  <p>CPU-ს ნაკადი</p>
                </div>
                <div className={classes.description}>
                  <p>{data.laptop.cpu.name}</p>
                  <p>{data.laptop.cpu.cores}</p>
                  <p>{data.laptop.cpu.threads}</p>
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
                  <p>{condition}</p>
                  <p>{`${data.laptop.price} ₾`}</p>
                </div>
              </div>
              <div className={classes.littlediv}>
                <div className={classes.query}>
                  <p>შევსების რიცხვი:</p>
                </div>
                <div className={classes.description}>
                  <p>{data.laptop.purchase_date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ListItem;
