import React from "react";

const ErrorInlineMessage = ({ serverErr, appErr }) => {
  return serverErr || appErr ? (
    <div className="alert alert-danger" role="alert">
      {serverErr} {appErr}
    </div>
  ) : null;
};

export default ErrorInlineMessage;
