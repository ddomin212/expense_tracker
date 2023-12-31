import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "../../../redux/slices/users/usersSlice";
const PrivateNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuth } = useSelector((state) => state?.users);
  const links = ["Dashboard", "Profile", "Expense", "Income", "Buy"];
  return (
    <>
      <nav
        class="navbar navbar-dark navbar-expand-md sticky-top py-3"
        id="mainNav"
      >
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" href="/">
            <span>{userAuth?.user?.role}</span>
          </a>
          <button
            data-bs-toggle="collapse"
            class="navbar-toggler"
            data-bs-target="#navcol-1"
          >
            <span class="visually-hidden">Toggle navigation</span>
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navcol-1">
            <ul class="navbar-nav mx-auto">
              {links.map((link) => (
                <li class="nav-item">
                  <a class="nav-link active" href={`/${link.toLowerCase()}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <button
              class="btn btn-primary shadow"
              onClick={() => {
                dispatch(logoutUserAction());
                navigate("/login");
              }}
              style={{ height: "50px" }}
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PrivateNavbar;
