import { CDN_URL } from "../utils/constants";
const Rest_card = (props) => {
  const { res_data } = props;
  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    deliveryTime,
  } = res_data.info;

  return (
    <div className="res_card">
      <img
        className="res-logo"
        alt="anya"
        src={CDN_URL + cloudinaryImageId}
      ></img>
      <h3>{name}</h3>
      <h4 className="a">{cuisines.join(", ")}</h4>
      <h4 className="a">{avgRating}</h4>
      <h4 className="a">{costForTwo}</h4>
      <h4 className="a">{deliveryTime}</h4>
    </div>
  );
};

export default Rest_card;
