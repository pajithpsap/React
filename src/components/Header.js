import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
// Header
const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  //subscribing to the store using selector
  const cartItems = useSelector((store)=>store.cart.items);
  return (
    <div className="flex justify-between bg-gray-100">
      <div className="bg-gray-100">
        <img className="w-3/12 ml-3" src={LOGO_URL}></img>
      </div>

      <div >
        <ul className="flex flex-wrap">
          <li className="p-2 m-2 text-xl">
            <Link>Online Status: {onlineStatus ? "✅" : "🔴"}</Link>
          </li>
          <li className="p-2 m-2 text-xl">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2 m-2 text-xl">
            <Link to="/about">About Us</Link>
          </li>
          <li className="p-2 m-2 text-xl">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="p-2 m-2 text-xl">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="p-2 m-2 text-xl">
            <Link to="/cart">Cart - ({cartItems.length} items)</Link>
          </li>
          <button
             className="p-2 m-2 text-xl"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
