import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./NewDog.css";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NewDog = () => {
  let navigate = useNavigate();

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: { name: "", age: "", from: "", gender: "", img: "" },
      validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        age: Yup.number().required().positive().integer(),
        from: Yup.string().required(),
        gender: Yup.string().required(),
        img: Yup.string().url().required(),
      }),
      onSubmit: ({ name, age, from, gender, img }) => {
        alert(`YaY you just add a new friend, ${name}`);
        navigate("/user/1");
      },
    });
  return (
    <form className="new-dog-form" onSubmit={handleSubmit}>
      <div>
        <h1 className="main-welcome-user-page">Add a new friend</h1>
      </div>
      <div className="new-dog-card">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Dogs Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.name && errors.name ? <div>{errors.name}</div> : null}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="text"
            placeholder="Enter Dogs Age"
            name="age"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.age && errors.age ? <div>{errors.age}</div> : null}
        </div>
        <div>
          <label htmlFor="from">From</label>
          <input
            type="text"
            placeholder="Where Are You From? "
            name="from"
            value={values.from}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.from && errors.from ? <div>{errors.from}</div> : null}
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            placeholder="Enter a Gender"
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
          <label htmlFor="img">Image</label>
          <input
            type="text"
            placeholder="Add Your Dog Picture URL"
            name="img"
            value={values.img}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.img && errors.img ? <div>{errors.img}</div> : null}
        </div>
        <button type="submit" className="loginButton">
          Add Friend
        </button>
      </div>
    </form>
  );
};

export default NewDog;
