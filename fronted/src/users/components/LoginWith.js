import React from "react";
import GoogleButton from "react-google-button";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import ReactFacebookLogin from "react-facebook-login";
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
        {/* <i class="fab fa-google"></i> */}
      </button>
      <button
        className="login-with-btn fb-btn"
        onClick={() => {
          console.log("Loggin via Google");
        }}
      >
        {/* <i className="fab fa-facebook"></i> */}
      </button>
    </div>
  );
};

export default LoginWith;
