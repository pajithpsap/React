import { useState } from "react";
import ItemList from "./ItemList";
const RestaurantCategory = ({data, showItem, setShowIndex}) => {
  
  const handleClick = ()=>{
    setShowIndex();
    showItem = !showItem;
  }
  return (
    <div>
      <div className=" bg-gray-50 w-6/12 mx-auto my-3 p-4 shadow-lg ">
        <div className="flex justify-between cursor-pointer" onClick={handleClick}>
          <span className="font-bold text-lg">
            {data.title}({data.itemCards.length})
          </span>
          <span>⬇️</span>
        </div>

        {showItem && <ItemList items={data?.itemCards} />}
      </div>
    </div>
  );
};
export default RestaurantCategory;
