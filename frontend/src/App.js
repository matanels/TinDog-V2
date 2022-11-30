import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./shared/home/components/Home";
import User from "./users/pages/User";
import Dogs from "./dogs/pages/Dogs";
import NavBar from "./shared/components/Navigation/NavBar";
import Login from "./users/pages/Login";
import Register from "./users/pages/Register";
import NewDog from "./dogs/pages/NewDog";
import EditDog from "./dogs/pages/EditDog";
import { AuthContext } from "./shared/home/context/auth-context";

import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    console.log("Logged in");
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/dogs/newDog" element={<NewDog />} />
        <Route path="/users/:userId" element={<User />} />
        <Route path="/dogs/:dogId" element={<Dogs />} />
        <Route path="/dogs/edit/:dogId" element={<EditDog />} />
        <Route path="*" element={<Home />} />
      </Routes>
    );
  } else {
    console.log("Not logged in");

    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/dogs/:dogId" element={<Dogs />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <NavBar />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
