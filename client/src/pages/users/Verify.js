import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPage = () => {
  const [error, setError] = useState(undefined);
  const query = useQuery();

  const verifyToken = async () => {
    try {
      await axios.post(`${baseUrl}/api/auth/verify-email`, {
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return !error ? (
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
  ) : (
    <ErrorDisplayMessage message={error.response} />
  );
};

export default VerifyPage;
