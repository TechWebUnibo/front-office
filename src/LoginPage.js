import React from "react";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <div>
      <h1>Loging page</h1>
      <Link to="/signup">register for free</Link>
    </div>
  );
};

export default LoginPage;
