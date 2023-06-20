import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import { LOGIN } from "../CONSTANTS";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../redux/slices/authSlice";
import Spinner from "../../components/Spinner/Spinner";
import Navbar from "../../components/Navbar/Navbar";

function PrivateRoutes() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const location = useLocation();

  const renderPrivateRoutes = () => {
    switch (isLoggedIn) {
      case true:
        return (
          <>
            <Header />
            <Outlet />
            <Navbar />
          </>
        );
      case false:
        return <Navigate to={LOGIN} state={{ from: location }} replace />;

      default:
        return null;
    }
  };

  return isLoading ? <Spinner /> : renderPrivateRoutes();
}

export default PrivateRoutes;
