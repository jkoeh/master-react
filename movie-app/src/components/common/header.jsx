import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        Vidly
      </NavLink>
      <div className=" navbar-nav ">
        <NavLink className="nav-link nav-item" to="/movies">
          Movies
        </NavLink>
        <NavLink className="nav-link nav-item" to="/customers">
          Customers
        </NavLink>
        <NavLink className="nav-link nav-item" to="/rentals">
          Rentals
        </NavLink>
        <NavLink className="nav-link nav-item" to="/login">
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
