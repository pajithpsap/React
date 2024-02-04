import { useState, useEffect } from "react";
//import restaurent_data from "../utils/mock_data";
import Rest_card from "./Rest_card";
//import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // useState Hook
  let [rest_data, set_restaurent_data] = useState([]);
  let [fil_rest_data, set_fil_restaurent_data] = useState([]);
  let [searchText, setSearchText] = useState("");
  // useEffect Hook
  useEffect(() =>{
    fetchData();
  }, []);

  const fetchData = async () =>{
    const promi = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const jsonData = await promi.json();
    set_restaurent_data(jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    set_fil_restaurent_data(jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    console.log(jsonData);
  };

  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false){
    return(
      <h1>Looks like you're offline. Check your internet connection !!!</h1>
    )
  }
  // if(rest_data.length == 0){
  //   return <Shimmer />;
  // }
  return (
    <div className="body-container">
      <div className="search-bar">
         
        <div className="filter">
          <input type="text" value ={searchText} onChange={(e) =>{
            setSearchText(e.target.value)
          }}/>
          <button className="serach-btn"onClick={() =>{
            let search_results = rest_data.filter((rest)=> rest.info.name.toLowerCase().includes(searchText.toLowerCase()) );
            set_fil_restaurent_data(search_results);
          }} >Search</button>
        </div>

        
        <button className="top-btn" onClick={() => {
          const filteredList = rest_data.filter(
            (res) => res.info.avgRating > 4
          );
          set_restaurent_data(filteredList);
        }}>
          Top Restaurents
        </button>
      </div>
      <div className="restaurent-container">
        {fil_rest_data.map((restaurent) => {
          return <Link key={restaurent.info.id} to={"/restaurants/"+ restaurent.info.id}><Rest_card  res_data={restaurent} /></Link>;
        })}
      </div>
    </div>
  );
};

export default Body;
