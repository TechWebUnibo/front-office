import React from "react";
import { Link } from "react-router-dom";
const SignupPage = () => {
  return (
    <div>
      <h1>Signup page</h1>
      <Link to="/login">hai già un account? Fai Log in</Link>
    </div>
  );
};

export default SignupPage;
