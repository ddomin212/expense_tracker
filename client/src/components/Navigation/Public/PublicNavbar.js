import React from "react";
import { Link } from "react-router-dom";
const PublicNavbar = () => {
  return (
    <>
      <nav
        id="mainNav"
        class="navbar navbar-dark navbar-expand-md sticky-top py-3"
      >
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" href="/">
            <span>Buda</span>
          </a>
          <button
            class="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navcol-1"
          >
            <span class="visually-hidden">Toggle navigation</span>
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="navcol-1" class="collapse navbar-collapse">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <a class="nav-link active" href="/start">
                  Starter
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
            <a class="btn btn-primary shadow" role="button" href="/register">
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PublicNavbar;
