import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../home/context/auth-context";

import "./NavLinks.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="main-connect-btn">
      <li>
        <NavLink to="/dogs">Dogs</NavLink>
      </li>
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/users/register">Register</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/users/login">Login</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/dogs/newDog">Add Dog</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/users/${auth.userId}`}>My Dogs</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink
            to="/"
            onClick={() => {
              auth.logout();
            }}
          >
            Log out
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
