import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function LoginPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [apiMessage, setApiMessage] = useState("");
const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setApiMessage("");

  if (validateForm()) {
    try {
      setLoading(true);

      await API.post("/login", {
        email: loginData.email,
        password: loginData.password,
      });

      navigate("/home");
    } catch (error) {
      setApiMessage("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }
};

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>Welcome Back 👋</h1>
        <p>Please login to continue</p>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={loginData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={loginData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <button type="submit" disabled={loading}>
  {loading ? "Logging in..." : "Login"}
</button>
{apiMessage && <div className="api-error">{apiMessage}</div>}

        <div className="signup-text">
          New user? <Link to="/register">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;