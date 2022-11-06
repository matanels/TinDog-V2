import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import NavLinks from "./NavLinks";

import "./NavBar.css";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  // const openDrawerHandler = (event) => {
  //   <SideDrawer />;
  // };

  return (
    <React.Fragment>
      <SideDrawer>
        <nav>
          <NavLinks />
        </nav>
      </SideDrawer>
      <header className="main-header">
        <h2 className="main-title-btn">
          <Link to="/">TinDog</Link>
        </h2>
        <button className="main-navigation-btn">
          <span />
          <span />
          <span />
        </button>

        <nav>
          <NavLinks />
        </nav>
      </header>
    </React.Fragment>
  );
};

export default NavBar;
