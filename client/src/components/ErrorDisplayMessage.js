import React from "react";

const ErrorDisplayMessage = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p class="alert alert-danger" role="alert">
        {message}
      </p>
    </div>
  );
};

export default ErrorDisplayMessage;
