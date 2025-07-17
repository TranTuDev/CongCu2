import React, { useState } from "react";
import "./Register_login.scss";
import { register } from './api/api';

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        body: new URLSearchParams(form),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = data.role === "admin" ? "/admin" : "/users";
      } else {
        setMessage(data.error || "Đăng nhập thất bại!");
      }
    } catch (err) {
      setMessage("Lỗi kết nối tới server!");
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        body: new URLSearchParams(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Đăng ký thành công! Chuyển đến đăng nhập...");
        setIsRegister(false);
      } else {
        setMessage(data.error || "Lỗi đăng ký!");
      }
    } catch (err) {
      setMessage("Lỗi kết nối tới server!");
      console.error(err);
    }
  };

  return (
    <section id="dndk">
      <div className={`wrapperdkdn ${isRegister ? "active" : ""}`}>
       

        {/* Login Form */}
        {!isRegister && (
          <div className="form-box login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="input-box">
                <span className="icon1">
                  <i className="bx bx-envelope" />
                </span>
                <input type="email" name="email" required />
                <label>Email</label>
              </div>

              <div className="input-box">
                <span className="icon1">
                  <i className="bx bx-lock-alt" />
                </span>
                <input type="password" name="password" required />
                <label>Password</label>
              </div>

              <div className="remmber-forgot">
                <label>
                  <input type="checkbox" /> Remember Me{" "}
                  <a href="#">Forgot Password?</a>
                </label>
              </div>

              <button type="submit" className="btn">
                Login
              </button>

              <div className="login-register">
                <p>
                  Don't have an account?{" "}
                  <a href="#" onClick={() => setIsRegister(true)}>
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}

        {/* Register Form */}
        {isRegister && (
          <div className="form-box register">
            <h2>Registration</h2>
            <form onSubmit={handleRegister}>
                <div className="box"> 
              <div className="input-box">
                <span className="icon1">
                  <i className="bx bx-user" />
                </span>
                <input type="text" name="name" required />
                <label>Username</label>
              </div>

              <div className="input-box">
                <span className="icon1">
                  <i className="bx bx-envelope" />
                </span>
                <input type="email" name="email" required />
                <label>Email</label>
              </div>

              <div className="input-box">
                <span className="icon1">
                  <i className="bx bx-lock-alt" />
                </span>
                <input type="password" name="password" required />
                <label>Password</label>
              </div>

              <div className="remmber-forgot">
                <label>
                  <input type="checkbox" /> I agree to the terms & conditions
                </label>
              </div>

              <button type="submit" className="btn">
                Register
              </button>
              </div>

              <div className="login-register">
                <p>
                  Already have an account?{" "}
                  <a href="#" onClick={() => setIsRegister(false)}>
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}

        <div id="message" style={{ color: "red", textAlign: "center", marginTop: 10 }}>
          {message}
        </div>
      </div>
    </section>
  );
};

export default LoginRegister;
