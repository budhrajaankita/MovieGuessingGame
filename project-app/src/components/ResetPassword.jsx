import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styleSheet/ResetPassword.css";
import "./styleSheet/Login.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleBacktoLogin = () => {
    navigate("/login");
  };

  const handleReset = () => {
    let user = credentials.name;
    // edge case: if user does not input anything
    if (!credentials.name || !credentials.email || !credentials.newPassword) {
      alert("Please fill in all the fields!");
      return;
    }
    //fetch user data from local storage by id
    const storedUserData = localStorage.getItem(`${user}`);
    if (storedUserData) {
      const storedData = JSON.parse(storedUserData);
      //check if the user input matches the data in local storage
      //if yes, update the password
      //if no, check if the username or email matches the data in local storage
      //if no, alert "username or email does not exist",please sign up
      if (
        credentials.name === storedData.name &&
        credentials.email === storedData.email
      ) {
        storedData.password = credentials.newPassword;
        localStorage.setItem(`${user}`, JSON.stringify(storedData));
        alert("Password reset successful!Navigate to login page!");
        navigate("/login");
      } else if (
        credentials.name !== storedData.name ||
        credentials.email !== storedData.email
      ) {
        alert("Username or email is does not match!Please try again!");
        return;
      }
    } else {
      alert("User does not exist! Please Signup First!");
      navigate("/signup");
    }
  };

  return (
    <form>
      <div className="reset-password-container">
        <div className="header">
          <div className="text">Reset Password</div>
          <div className="login-underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              name="name"
              placeholder="Please enter your name"
              value={credentials.name}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <input
              type="email"
              name="email"
              placeholder="Please enter your email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <input
              type="password"
              name="newPassword"
              placeholder="Please enter your new password"
              value={credentials.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="submit-container">
            <button type="submit" className="submit" onClick={handleReset}>
              Password Reset!
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

export default ResetPassword;
