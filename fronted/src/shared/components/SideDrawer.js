import React from "react";
import ReactDOM from "react-dom";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  return <aside className="side-drawer">{props.children}</aside>;
};

export default SideDrawer;
