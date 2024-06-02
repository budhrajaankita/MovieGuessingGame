import React from "react";
import "./styleSheet/Login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import user_icon from "../components/assets/person.png";
import email_icon from "../components/assets/email.png";
import password_icon from "../components/assets/password.png";
import movie_star from "../components/assets/movie_star.png";

const Login = () => {
  const navigate = useNavigate();
  //set the initial state of the login status
  const [isLoginSuccessful, setLoginSuccessful] = useState(false);
  //set the initial state of the form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    let user = formData.name;
    // console.log(localStorage);
    //cannot login if user does not input anything
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all the fields!");
      return;
    }
    //fetch data from local storage by user id
    const storedUserDate = localStorage.getItem(`${user}`);
    //if user exists, check if the user input matches the data in local storage
    if (storedUserDate) {
      const parsedUserData = JSON.parse(storedUserDate);
      // console.log(parsedUserData);
      //if yes, alert "login successful!Redirecting to genre selection page!"
      if (
        parsedUserData.name === formData.name &&
        parsedUserData.email === formData.email &&
        parsedUserData.password === formData.password
      ) {
        setLoginSuccessful(true);
        localStorage.setItem(`active_user`, `${parsedUserData.name}`);
        // alert("Login successful!");
        navigate("/genreSelection");
      }
      //if no, alert "Wrong email,username or password!"
      else {
        alert("Wrong email,username or password!");
      }
    }
    //if user does not exist, alert "no user found!Please sign up first!"
    else {
      alert("User doesn't exist!Please sign up first!");
    }
  };

  //redirect to signup page
  const handleSignUp = () => {
    // localStorage.setItem("user", JSON.stringify(formData));
    navigate("/signup");
  };

  //redirect to reset password page
  const handleResetPassword = () => {
    navigate("/resetPassword");
  };

  return (
    <>
      <div className="title-container">
        <div className="star1">
          <img src={movie_star} alt="" />
        </div>
        <div className="title">
          <h1>
            Welcome to the <br></br>Movie Guessing Game!
          </h1>
          <h2>Login to access the game</h2>
        </div>
        <div className="star2">
          <img src={movie_star} alt="" />
        </div>
      </div>
      <form onSubmit={handleLogin}>
        <div className="container">
          <div className="header">
            <div className="text">Login</div>
            <div className="login-underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className="forgot-password">
            Lost Password?{" "}
            <span>
              <button className="resetPassButton" onClick={handleResetPassword}>
                Click Here!
              </button>
            </span>
          </div>
          <div className="submit-container">
            <button type="submit" className="submit" onClick={handleSignUp}>
              Sign Up
            </button>
            <button type="submit" className="submit">
              Login
            </button>
          </div>

          {isLoginSuccessful && <p>Login successful! Redirecting..</p>}
        </div>
      </form>
    </>
  );
};

export default Login;
