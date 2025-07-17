// components/RequiredAuth.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequiredAuth = ({ allowedRoles }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();

  // 1. Block immediately if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location, forceLogin: true }} replace />;
  }

  // 2. Block if role not allowed
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/denied" replace />;
  }

  return <Outlet />;
};

export default RequiredAuth;
