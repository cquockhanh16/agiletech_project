import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkAuthentication } from "../../services/apiServices";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const isAuthenticated = checkAuthentication();
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
