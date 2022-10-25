import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";

import Home from "./shared/home/components/Home";
import User from "./users/pages/User";
import Dogs from "./dogs/pages/Dogs";
import NotFound from "./shared/home/components/NotFound";
import NavBar from "./shared/components/NavBar";
import Login from "./users/pages/Login";
import Register from "./users/pages/Register";
import { AuthContext } from "./shared/home/context/auth-context";

import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    console.log(" logged in");
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<Dogs />} />
        {/* <Route path="/dogs/new" element={<NewDog />} /> */}
        <Route path="/user/:userId" element={<User />} />
        <Route path="*" element={<User />} />
      </Routes>
    );
  } else {
    console.log("not logged in");

    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/dogs/:dogId" element={<Dogs />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <NavBar />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
