import React,{lazy,Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import { Outlet } from "react-router-dom";
import Restaurant_Menu from "./components/Restaurant_Menu";
import { Provider } from "react-redux"; // it's a bridge b/w redux & react
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
const Grocery = lazy(()=>import("./components/Grocery"));
const AppLayout = () => {
  
  return (
    <Provider store={appStore}>
    <div className="app">
      <Header />
      <Outlet />
    </div>
    </Provider>
  );
  
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
        errorElement: <Error />,
      },
      {
        path: "/about",
        element: <About/>,
        errorElement: <Error/>,
      },
      {
        path: "/contact",
        element: <Contact />,
        errorElement: <Error/>,
      },
      {
        path: "/restaurants/:resId",
        /** resId is dynamic */
        element: <Restaurant_Menu />
      },
      {
        path: "/grocery",
        element: <Suspense fallback={<h1>Grocery is loading</h1>}><Grocery /></Suspense>
      },
      {
        path: "/cart",
        element: <Cart />
      }
    ],
    errorElement: <Error/>,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);
