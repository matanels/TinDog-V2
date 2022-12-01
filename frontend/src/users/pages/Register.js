import React, { useState, useContext } from "react";

import SpinnerModal from "../../shared/components/UIElements/SpinnerModal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/home/context/auth-context.js";

import "./Login.css";

const Register = () => {
  //formik Hooks version.
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorActive, setErrorActive] = useState(false);
  const [error, setError] = useState();

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email("Invalid email format").required(),
        password: Yup.string()
          .min(6, "Password should be longer then 6 characters.")
          .required(),
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Passwords must match"
        ),
      }),
      onSubmit: async ({ name, email, password }) => {
        try {
          setIsLoading(true);
          const response = await fetch(
            "http://localhost:5000/api/users/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                password,
              }),
            }
          );
          const responseData = await response.json();
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          setIsLoading(false);
          auth.login(responseData.user.id);
        } catch (err) {
          setIsLoading(false);
          setErrorActive(true);
          setError(err.message || "Something went wrong, please try again.");
        }
      },
    });
  return (
    <React.Fragment>
      <ErrorModal
        active={errorActive}
        hideModal={() => setErrorActive(false)}
        title="Error"
        okButton="OK"
      >
        {error}
      </ErrorModal>
      <form className="main-form" onSubmit={handleSubmit}>
        {isLoading && <SpinnerModal />}
        <div className="login-card">
          <div className="main-title">
            <h1>Register</h1>
            <hr />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {touched.name && errors.name ? <div>{errors.name}</div> : null}
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
            {touched.email && errors.email ? (
              <div>{errors.email}</div>
            ) : null}
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
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {touched.password && errors.password ? (
              <div>{errors.password}</div>
            ) : null}
          </div>
          <button type="submit" className="loginButton">
            Sign Up
          </button>
          <Link to="/">
            <button type="button" className="loginButton">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Register;
