import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { USERS } from "./User.js";
import { AuthContext } from "../../shared/home/context/auth-context.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Login.css";
import LoginWith from "../components/LoginWith.js";

const Login = () => {
  //React Hooks version

  //   const [login, setLogin] = useState({
  //     email: "",
  //     password: "",
  //   });
  //   const HandleSubmit = (e) => {
  //     const userLoged = USERS.find((item) => {
  //       return login.email === item.email && login.password === item.password;
  //     });
  //     if (userLoged) {
  //       return <User id={userLoged.id} />;
  //       // return <Link to={`/user/${userLoged.id}`} />; //stopped here
  //     } else console.log("not exits");
  //     e.preventDefault();
  //   };

  //   const onChangeHandle = (e) => {
  //     const value = e.target.value;
  //     setLogin({
  //       ...login,
  //       [e.target.name]: value,
  //     });
  //     e.preventDefault();
  //   };

  //   return (
  //     <form className="main-form" onSubmit={HandleSubmit}>
  //       <div className="login-card">
  //         <div className="main-title">
  //           <h1>Login</h1>
  //           <hr />
  //         </div>
  //         <div>
  //           <label htmlFor="email">Email</label>
  //           <input
  //             type="text"
  //             placeholder="Enter Username"
  //             name="email"
  //             value={login.email}
  //             onChange={onChangeHandle}
  //             required
  //           ></input>
  //         </div>
  //         <div>
  //           <label htmlFor="password">Password</label>
  //           <input
  //             type="password"
  //             placeholder="Enter Password"
  //             name="password"
  //             value={login.password}
  //             onChange={onChangeHandle}
  //             required
  //           ></input>
  //         </div>
  //         <button>Login</button>
  //         <button>Cancel</button>
  //       </div>
  //     </form>
  //   );

  //formik Hooks version.
  const auth = useContext(AuthContext);
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
      onSubmit: ({ email, password }) => {
        const userLoged = USERS.find((item) => {
          return email === item.email && password === item.password;
        });
        if (userLoged) {
          console.log(`${userLoged.id} exits`);
          auth.login();
          navigate(`/user/${userLoged.id}`);
        } else console.log("not exits");
      },
    });
  return (
    <form className="main-form" onSubmit={handleSubmit}>
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
