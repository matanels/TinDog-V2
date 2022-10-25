import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "./LoginWith.css";

const LoginWith = () => {
  return (
    <div className="login-with-div">
      <button
        className="login-with-btn gog-btn"
        onClick={() => {
          console.log("Loggin via Google");
        }}
      >
        <GoogleIcon />
      </button>
      <button
        className="login-with-btn fb-btn"
        onClick={() => {
          console.log("Loggin via Google");
        }}
      >
        <FacebookIcon />
      </button>
    </div>
  );
};

export default LoginWith;
