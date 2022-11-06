import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { USERS } from "./User.js";
import { Link } from "react-router-dom";

import "./Login.css";

const Register = () => {
  //formik Hooks version.

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
      onSubmit: ({ name, email, password }) => {
        const userExits = USERS.find((item) => {
          return email === item.email;
        });
        if (userExits) {
          alert(`${userExits.id} this email already registerd!`);
        } else console.log("not exits ");
      },
    });
  return (
    <form className="main-form" onSubmit={handleSubmit}>
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
  );
};

export default Register;
