import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { USERS } from "./User.js";
import { AuthContext } from "../../shared/home/context/auth-context.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Login.css";
import LoginWith from "../components/LoginWith.js";
import SpinnerModal from "../../shared/components/UIElements/SpinnerModal";

const Login = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().email("Invalid email format").required(),
        password: Yup.string()
          .min(6, "Password should be longer then 6 characters.")
          .required(),
      }),
      onSubmit: async ({ email, password }) => {
        const userLoged = USERS.find((item) => {
          return email === item.email && password === item.password;
        });
        if (userLoged) {
          console.log(`${userLoged.id} exits`);
          setIsLoading(true);
          auth.login();
          navigate(`/user/${userLoged.id}`);
        } else {
          console.log("not exits");
          setIsLoading(false);
        }
      },
    });
  return (
    <form className="main-form" onSubmit={handleSubmit}>
      {isLoading && <SpinnerModal />}
      <div className="login-card">
        <div className="main-title">
          <h1>Login</h1>
          <hr />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.email && errors.email ? <div>{errors.email}</div> : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.password && errors.password ? (
            <div>{errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="loginButton">
          Login
        </button>
        <Link to="/">
          <button type="button" className="loginButton">
            Cancel
          </button>
        </Link>
        <LoginWith />
        <hr />
        <div>
          <h3>
            Dont have an Account?
            <span className="register-span"> Register Now!</span>
          </h3>
        </div>
        <Link to="/user/register">
          <button type="button" className="loginButton">
            REGISTER
          </button>
        </Link>
      </div>
    </form>
  );
};

export default Login;
