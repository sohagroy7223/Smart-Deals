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
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import ProductDetails from "./Components/Page/ProductDetails";
import CreateProduct from "./Components/CreateProduct/CreateProduct";

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
        loader: () => fetch("http://localhost:3000/Products/"),
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
        path: "/productDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        element: (
          <PrivateRoutes>
            <ProductDetails></ProductDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "/createProduct",
        element: (
          <PrivateRoutes>
            <CreateProduct></CreateProduct>
          </PrivateRoutes>
        ),
      },
      {
        path: "/myProducts",
        element: (
          <PrivateRoutes>
            <MyProducts></MyProducts>
          </PrivateRoutes>
        ),
      },
      {
        path: "/myBids",
        element: (
          <PrivateRoutes>
            <MyBids></MyBids>
          </PrivateRoutes>
        ),
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
