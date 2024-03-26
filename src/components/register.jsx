import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { ReactUrl } from "./ReactURL.jsx";
import health_bg from "./assets/health_bg2.png";
// ------------------SIGNUP COMPONENT----------------
const Signup = () => {
  const navigate = useNavigate();
  // --------------------STATES-------------------------
  const [user_registration, setUser_registration] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
  });
  // ----------------HANDLE INPUT-------------------------
  const HandleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setUser_registration({ ...user_registration, [name]: value });
  };
  // ---------------HANDLE SUBMIT--------------------------
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(user_registration);
    try {
      const response = await fetch(`${ReactUrl}/customer/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user_registration),
      });
      const data = await response.json();
      const { status } = data; // Extract status property
      console.log("status:", status);

      if (response.ok) {
        if (status === "success") {
          console.log("Registration successful");
          navigate("/login");
        } else {
          console.log("this working");

          if (status === "failed") {
            console.log("Registration failed: Email is already registered");
            alert("Email is already registered");
          }
          console.error("Registration failed");
        }
      }
    } catch (error) {
      // If there's a network error or other issue, handle it here
      console.error("Error:", error);
    }
  };
  // ------------------------------------------------------
  return (
    <>
      <div className="signup-page">
        <section className="signup">
          <div className="health-img-container">
            <img
              src={health_bg}
              alt="register-background"
              className="register-left-side-img"
            />
            <div className="register-health-text-div">
              <h1>Health</h1>
              <h1>Insurance</h1>
              <h1>Policy</h1>
            </div>
          </div>
          <div className="register-container ">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign Up</h2>
                <form
                  className="registration-form"
                  id="registration-form"
                  onSubmit={HandleSubmit}
                >
                  <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="off"
                      placeholder="Your First Name"
                      value={user_registration.firstName}
                      onChange={HandleInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="off"
                      placeholder="Your Last Name"
                      value={user_registration.lastName}
                      onChange={HandleInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input
                      type="text"
                      name="gender"
                      id="gender"
                      autoComplete="off"
                      placeholder="Your Gender"
                      value={user_registration.gender}
                      onChange={HandleInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="off"
                      placeholder="Your Email"
                      value={user_registration.email}
                      onChange={HandleInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      placeholder="Your Password"
                      value={user_registration.password}
                      onChange={HandleInput}
                    />
                  </div>
                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className="form-submit"
                      value="Register"
                    />
                  </div>
                </form>
                <div className="signup-image"></div>
                <div className="login-user">
                  <span onClick={() => navigate("/login")}>
                    Already a user? Login!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
