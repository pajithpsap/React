import React from "react";
import { useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
const Restaurant_Menu = () => {
  const { resId } = useParams();

  const resMenuInfo = useRestaurantMenu(resId);
  const[showIndex, setShowIndex] = useState(0);
  if (resMenuInfo === null) {
    return <Shimmer />;
  }
  const { name, cuisines } = resMenuInfo?.cards[0]?.card?.card?.info;

  // const{itemCards} = resMenuInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  let itemCards;
  if (resMenuInfo.cards?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
    for (let card of resMenuInfo.cards[2].groupedCard.cardGroupMap.REGULAR
      .cards) {
      if (card?.card?.card?.itemCards) {
        itemCards = card.card.card.itemCards;
        break;
      }
    }
  }

  const categories =
    resMenuInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log(categories);

  return (
    <div className="text-center my-3">
      <h3 className="font-bold text-2xl">{name}</h3>
      <p className="text-lg font-semibold mb-3">{cuisines.join(", ")}</p>
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItem ={index === showIndex ? true : false}
          setShowIndex ={()=>(
            setShowIndex(index)
          )}
        />
      ))}
    </div>
  );
};

export default Restaurant_Menu;
