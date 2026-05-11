import { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user } = use(AuthContext);

  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoutes;
