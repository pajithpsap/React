import { useState, useEffect } from "react";
import Rest_card, {withPromotedLabel} from "./Rest_card";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // useState Hook
  let [rest_data, set_restaurent_data] = useState([]);
  let [fil_rest_data, set_fil_restaurent_data] = useState([]);
  let [searchText, setSearchText] = useState("");
  // useEffect Hook
  useEffect(() => {
    fetchData();
  }, []);
  // Prmoted RestauranT Card
  const RestaurantCardPromoted = withPromotedLabel(Rest_card);
  const fetchData = async () => {
    const promi = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonData = await promi.json();
    set_restaurent_data(
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    set_fil_restaurent_data(
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <h1>Looks like you're offline. Check your internet connection !!!</h1>
    );
  }

  return rest_data.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="">
      <div className="flex pb-7 pt-7">
        <div className="pl-10">
          <input
            className="border border-solid outline-gray-200 rounded-lg w-80 h-8"
            type="text"
            value={searchText} onChange={(e)=>{
              setSearchText(e.target.value);
            }}
            // placeholder="Enter your fav restaurant"
          />
          <button
            className="px-2 py-1 ml-2 bg-gray-300 rounded-lg"
            onClick={() => {
              let search_results = rest_data.filter((rest) =>
                rest.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              set_fil_restaurent_data(search_results);
            }}
          >
            Search
          </button>
        </div>

        <button
          className="px-2 py-1 ml-10 bg-gray-300 rounded-lg"
          onClick={() => {
            const filteredList = rest_data.filter(
              (res) => res.info.avgRating > 4
            );
            set_fil_restaurent_data(filteredList);
          }}
        >
          Top Restaurents
        </button>
      </div>
      <div className="flex flex-wrap flex-row">
        {fil_rest_data.map((restaurant) => {
          return (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              { restaurant?.info.promoted ? (<RestaurantCardPromoted res_data={restaurant}/>) : (<Rest_card res_data={restaurant} />)}
              
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
