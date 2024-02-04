import React from 'react'
import Shimmer from './Shimmer'
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
const Restaurant_Menu = () => {

    const {resId}= useParams();

    const resMenuInfo = useRestaurantMenu(resId);

   if(resMenuInfo === null){
    return <Shimmer />
   }
    const{name, cuisines} = resMenuInfo?.cards[0]?.card?.card?.info;

    // const{itemCards} = resMenuInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
 
    let itemCards;
    if (resMenuInfo.cards?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
    for (let card of resMenuInfo.cards[2].groupedCard.cardGroupMap.REGULAR.cards) {
        if (card?.card?.card?.itemCards) {
        itemCards = card.card.card.itemCards;
        break;
        }
    }
    }

  return (
    <div className='menu'>
        <h3>{name}</h3>
        <h3>{cuisines.join(", ")}</h3>
       
        <ul>
            {itemCards && itemCards.map((item)=>(
                <li key={item.card.info.id}>{item.card.info.name} - Rs {item.card.info.price/100 || item.card.info.defaultPrice/100}</li>
            ))}   
        </ul>
    </div>
  );
};

export default Restaurant_Menu;