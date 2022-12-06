import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../UIElements/ErrorModal";
import SpinnerModal from "../UIElements/SpinnerModal";

import { AuthContext } from "../../home/context/auth-context.js";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./DogForm.css";
import "../../../users/pages/Login.css";

const DogForm = (props) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorActive, setErrorActive] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        age: "",
        breed: "",
        from: "",
        gender: "",
        image: "",
        creator: "",
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        age: Yup.number().required().positive(),
        breed: Yup.string().required(),
        from: Yup.string().required(),
        gender: Yup.string().required(),
        image: Yup.string().url().required(),
      }),
      onSubmit: async ({
        name,
        age,
        breed,
        from,
        gender,
        image,
        creator,
      }) => {
        try {
          setIsLoading(true);
          const response = await fetch(`${props.url}`, {
            method: `${props.method}`,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              age,
              breed,
              from,
              gender,
              image,
              creator: auth.userId,
            }),
          });
          const responseData = await response.json();
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          setIsLoading(false);
          auth.login(responseData.dog.creator);
          navigate(`/users/${auth.userId}`);
          // navigate("/");
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
      <form className="new-dog-form" onSubmit={handleSubmit}>
        {isLoading && <SpinnerModal />}
        <div>
          <h1 className="main-welcome-user-page">{props.title}</h1>
        </div>
        <div className="new-dog-card">
          <div>
            <label htmlFor="name">{props.labelName}</label>
            <input
              type={props.type}
              placeholder={props.namePlaceholder}
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {touched.name && errors.name ? <div>{errors.name}</div> : null}
          </div>

          <div>
            <label htmlFor="age">{props.labelAge}</label>
            <input
              type={props.type}
              placeholder={props.agePlaceholder}
              name="age"
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {touched.age && errors.age ? <div>{errors.age}</div> : null}
          </div>

          <div>
            <label htmlFor="breed">{props.labelBreed}</label>
            <input
              type={props.type}
              placeholder={props.breedPlaceholder}
              name="breed"
              value={values.breed}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {touched.breed && errors.breed ? (
              <div>{errors.breed}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="from">{props.labelFrom}</label>
            <input
              type={props.type}
              placeholder={props.fromPlaceholder}
              name="from"
              value={values.from}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {touched.from && errors.from ? <div>{errors.from}</div> : null}
          </div>

          <div>
            <label htmlFor="gender">{props.labelGender}</label>
            <input
              type={props.type}
              placeholder={props.genderPlaceholder}
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {touched.gender && errors.gender ? (
              <div>{errors.gender}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="image">{props.labelImage}</label>
            <input
              type={props.type}
              placeholder={props.imagePlaceholder}
              name="image"
              value={values.image}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {touched.image && errors.image ? (
              <div>{errors.image}</div>
            ) : null}
          </div>
          <button type="submit" className="loginButton">
            {props.buttonName}
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default DogForm;
