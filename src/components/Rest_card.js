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
    <div className="flex flex-col w-56 h-80 m-4 bg-gray-100 hover:bg-gray-200 rounded-3xl">
      <img
        className="w-52 h-2/5 pt-[10px] mx-auto rounded-2xl"
        alt="anya"
        src={CDN_URL + cloudinaryImageId}
      ></img>
      <div className="flex flex-col">
        <h3 className="font-semibold pl-2">{name}</h3>
        <h4 className="font-normal pl-2">{cuisines.join(", ")}</h4>
        <h4 className="font-normal pl-2">{avgRating}</h4>
        <h4 className="font-normal pl-2">{costForTwo}</h4>
        <h4 className="font-normal pl-2">{deliveryTime}</h4>
      </div>
    </div>
  );
};

//Higher order componenet
export const withPromotedLabel = (Rest_card) => {
  return (props) => {
    return (
      <div>
        <label>Promoted</label>
        <Rest_card {...props}/>
      </div>
    );
  };
};

export default Rest_card;
