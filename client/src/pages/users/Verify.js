import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPage = () => {
  const [error, setError] = useState(false);
  const query = useQuery();

  const verifyToken = async () => {
    try {
      const { data } = await axios.post(`${baseUrl}/api/auth/verify-email`, {
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
    } catch (error) {
      console.log(error.response);
      setError(true);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (error) {
    return (
      <section class="py-4 py-xl-5">
        <div class="container">
          <h1 class="text-center">Verification failed</h1>
        </div>
        <div class="container d-flex justify-content-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="1em"
            height="1em"
            fill="currentColor"
            style={{ fontSize: "126px", marginTop: "32px" }}
          >
            <path d="M256-.0078C260.7-.0081 265.2 1.008 269.4 2.913L457.7 82.79C479.7 92.12 496.2 113.8 496 139.1C495.5 239.2 454.7 420.7 282.4 503.2C265.7 511.1 246.3 511.1 229.6 503.2C57.25 420.7 16.49 239.2 15.1 139.1C15.87 113.8 32.32 92.12 54.3 82.79L242.7 2.913C246.8 1.008 251.4-.0081 256-.0078V-.0078zM256 444.8C393.1 378 431.1 230.1 432 141.4L256 66.77L256 444.8z"></path>
          </svg>
        </div>
      </section>
    );
  }

  return (
    <section class="py-4 py-xl-5">
      <div class="container">
        <h1 class="text-center">Your email has been successfuly verified</h1>
      </div>
      <div class="container d-flex justify-content-center">
        <a
          href="/login"
          class="btn btn-primary"
          type="button"
          style={{ marginTop: "32px", width: "200px", height: "50px" }}
        >
          Log In
        </a>
      </div>
    </section>
  );
};

export default VerifyPage;
