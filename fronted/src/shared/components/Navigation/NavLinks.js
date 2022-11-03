import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../home/context/auth-context";
import { useParams } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
  const userId = useParams().userId;
  console.log(useParams());
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
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/dogs/newDog">Add Dog</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/user/${userId}`}>My Dogs</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
