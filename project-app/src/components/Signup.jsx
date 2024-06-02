import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styleSheet/Signup.css";
import "./styleSheet/Login.css";

import user_icon from "../components/assets/person.png";
import email_icon from "../components/assets/email.png";
import password_icon from "../components/assets/password.png";

const SignUp = () => {
  const navigate = useNavigate();
  //set the initial state of the form data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //handle the change of the form data
  //get the input value and set the as json format
  //spread operator to create a new object and update or add the new value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    let newUser = userData.name;
    //cannot signup if user does not input anything
    if (!userData.name || !userData.email || !userData.password) {
      alert("Please fill in all the fields!");
      return;
    }
    //set username as the key and the user data as the value in JSON format
    //save the data in local storage
    localStorage.setItem(`${newUser}`, JSON.stringify(userData));
    alert("Sign up successful!");
    navigate("/login");
  };

  const handleBacktoLogin = () => {
    navigate("/login");
  };

  return (
    <form>
      <div className="signupContainer">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="login-underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              name="name"
              placeholder="Please enter your name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              name="email"
              placeholder="Please enter your email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name="password"
              placeholder="Please enter your password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <div className="submit-container">
            <button type="submit" className="submit" onClick={handleSave}>
              Save
            </button>
            <button
              type="submit"
              className="submit"
              onClick={handleBacktoLogin}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
