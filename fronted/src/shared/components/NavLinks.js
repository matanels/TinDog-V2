import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../home/context/auth-context";

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
          <NavLink to="/user/register">Register</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/user/login">Login</NavLink>
        </li>
      )}
      {/* {!auth.isLoggedIn && (
        <li>
          <NavLink to="/user/login">Add Dog</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/user/login">My Dogs</NavLink>
        </li>
      )} */}
    </ul>
  );
};

export default NavLinks;
