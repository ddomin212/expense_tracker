import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  //check if user is loggin
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  return userAuth ? children : <Navigate to="/login" />;
};

export default ProtectRoute;
