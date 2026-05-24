import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";

const Root = () => {
  return (
    <div className="w-11/12 mx-auto p-2 bg-[#e9e9e951]">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
