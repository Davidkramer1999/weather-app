import React from "react";

import "./css/ErrorMessage.css";

interface ErrorMessageProp {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProp) {
  return <div className="errorMessage">{message}</div>;
}

export default ErrorMessage;
