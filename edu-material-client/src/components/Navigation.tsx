import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  return (
    <div className="navigation">
      <img src={require("../assets/images/logo.png")} />
      <h1>Presentation editor</h1>
      <div>
        <Link to="/" className={location.pathname === '/' ? 'selected' : ''}>Home</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'selected' : ''}>About</Link>
      </div>
    </div>
  );
};

export default Navigation;
