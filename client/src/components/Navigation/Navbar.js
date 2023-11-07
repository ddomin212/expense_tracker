import React from "react";
import { useSelector } from "react-redux";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {
  const user = useSelector((state) => state?.users);

  const { userAuth } = user;
  return <>{userAuth ? <PrivateNavbar /> : <PublicNavbar />}</>;
};

export default Navbar;
