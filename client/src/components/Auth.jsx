import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import signUpImage from "../assets/signup.jpg";

const initialState = {
  fullName: "",
  userName: "",
  password: "",
  phoneNumber: "",
  avatarURL: "",
};

const cookies = new Cookies();

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, userName, password, phoneNumber, avatarURL } = form;
    const URL = "http://localhost:5000/auth";

    const {
      data: { token, userId, hashedPassword },
    } = await axios.post(`${URL}/${isSignUp ? "signup" : "login"}`, {
      userName,
      password,
      fullName,
      phoneNumber,
      avatarURL,
    });

    cookies.set("token", token);
    cookies.set("userName", userName);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if (isSignUp) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }
    window.location.reload();
  };
  const switchMode = () => {
    setIsSignUp((previousIsSignUp) => !previousIsSignUp);
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                name="userName"
                placeholder="User Name"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  type="text"
                  name="avatarURL"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignUp ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUp
                ? "Already have an account?"
                : "Do not have an account?"}
              <span onClick={switchMode}>
                {isSignUp ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signUpImage} alt="Sign Up" />
      </div>
    </div>
  );
};

export default Auth;
