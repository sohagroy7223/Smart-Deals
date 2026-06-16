import { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    <span className="loading loading-bars loading-xl"></span>;
  }

  if (user) {
    return children;
  }
  return <Navigate state={location?.pathname} to="/login"></Navigate>;
};

export default PrivateRoutes;
