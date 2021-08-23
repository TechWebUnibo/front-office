import React from "react";
import { Link } from "react-router-dom";
const SignupPage = () => {
  return (
    <div>
      <p className="display-2">Registrati</p>
      <Link to="/login">hai già un account? Fai Log in</Link>
    </div>
  );
};

export default SignupPage;
