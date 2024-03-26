import React, { useState } from "react";
import "./login.css";
import health_bg from "./assets/health_bg2.png";
import { useNavigate } from "react-router-dom";
import { ReactUrl } from "./ReactURL";


const Login = ({ isAdmin }) => {
  const navigate = useNavigate();
// ------------------STATES----------------------------
  const [user_login, setUser_login] = useState({
    email: "",
    password: "",
  });

  const [Admin, SetAdmin] = useState({
    username: "",
    password: "",
  });
// -----------------HANDLE INPUT------------------------
  const HandleInput = (e) => {
    console.log(isAdmin);
    const { name, value } = e.target;
    if (isAdmin) {
      SetAdmin((prevAdmin) => ({
        ...prevAdmin,
        [name]: value,
      }));
    } else {
      setUser_login((prevUserLogin) => ({
        ...prevUserLogin,
        [name]: value,
      }));
    }
  };
// -----------------HANDLE SUBMIT----------------------
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isAdmin) {
        response = await fetch(`${ReactUrl}/admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Admin),
        });
      } else {
        response = await fetch(`${ReactUrl}/customer/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user_login),
        });
      }

      if (response.ok) {
        const data = await response.json();
        const { status, token } = data;
        if (status === "Success") {
          if (isAdmin) {
            localStorage.setItem("admin_token", token); // Store admin token
            navigate("/AdminDashboard");
          } else {
            localStorage.setItem("token", token); // Store regular user token
            navigate("/dashboard");
          }
        }
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
// ----------------------------------------------------
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#E4FFED"
      }}
    >
      <section className="login_page">
        <div className="health-img-container">
          <img
            src={health_bg}
            alt="health-background"
            className="left-side-img"
          />
          <div className="health-text-div">
          <h1>Health</h1>
          <h1>Insurance</h1>
          <h1>Policy</h1>

          </div>
          
        </div>
        <div className="login-container" >
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">
                {isAdmin ? "Admin Login" : "User Login"}
              </h2>
              <form
                className="registration-form"
                id="registration-form"
                onSubmit={HandleSubmit}
              >
                {isAdmin ? (
                  <>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        name="username"
                        id="Username"
                        autoComplete="off"
                        placeholder="Your Username"
                        value={Admin.username}
                        onChange={HandleInput}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Password">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="Password"
                        autoComplete="off"
                        placeholder="Your Password"
                        value={Admin.password}
                        onChange={HandleInput}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="off"
                        placeholder="Your Email"
                        value={user_login.email}
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
                        value={user_login.password}
                        onChange={HandleInput}
                      />
                    </div>
                  </>
                )}
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="login"
                    id="login"
                    className="form-submit"
                    value="Login"
                  />
                </div>
              </form>
              {isAdmin && (
                <div className="back-login">
                  <span onClick={() => navigate("/register")}>SignUp</span>
                  <span onClick={() => navigate("/login")}>Login</span>
                </div>
              )}
              {!isAdmin && ( // Render only if it's user login
                <div className="login-admin">
                  <span onClick={() => navigate("/adminLogin")}>
                    Login as admin
                  </span>
                  <span onClick={() => navigate("/register")}>SignUp</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Login;