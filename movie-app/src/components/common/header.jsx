import React from "react";
import { NavLink } from "react-router-dom";
import LogOut from "./logOut";

const Header = ({ user }) => {
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
        {!user && (
          <React.Fragment>
            <NavLink className="nav-link nav-item" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link nav-item" to="/register">
              Register
            </NavLink>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <NavLink className="nav-link nav-item" to="/profile">
              {user.name}
            </NavLink>
            <NavLink className="nav-link nav-item" to="/logout">
              Logout
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default Header;
