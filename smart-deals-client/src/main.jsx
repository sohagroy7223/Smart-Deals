import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Components/Layout/Root";
import Home from "./Components/Home/Home";
import AllProducts from "./Components/AllProducts/AllProducts";
import AuthProvider from "./Context/AuthProvider";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import MyProducts from "./Components/MyProducts/MyProducts";
import MyBids from "./Context/MyBids/MyBids";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProducts",
        Component: AllProducts,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/myProducts",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/myBids",
        element: <MyBids></MyBids>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
