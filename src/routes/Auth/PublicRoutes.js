import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import { DASHBOARD } from "../CONSTANTS";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";

function PublicRoutes() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const location = useLocation();

  const renderPublicRoutes = () => {
    switch (isLoggedIn) {
      case false:
        return <Outlet />;
      case true:
        return <Navigate to={DASHBOARD} state={{ from: location }} replace />;

      default:
        return null;
    }
  };

  return isLoading ? <Spinner /> : renderPublicRoutes();
}

export default PublicRoutes;
