import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function RegisterPage() {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [apiMessage, setApiMessage] = useState("");
const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!registerData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!registerData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!registerData.password) {
      newErrors.password = "Password is required";
    } else if (registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

      await API.post("/register", {
        fullName: registerData.fullName,
        email: registerData.email,
        password: registerData.password,
      });

      setApiMessage("Registration successful ✅");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      setApiMessage("Email already exists");
    } finally {
      setLoading(false);
    }
  }
};

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>Create Account ✨</h1>
        <p>Register to continue</p>

        <input
          type="text"
          name="fullName"
          placeholder="Enter full name"
          value={registerData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <span className="error">{errors.fullName}</span>}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={registerData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="password"
          name="password"
          placeholder="Create password"
          value={registerData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={registerData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}

        <button type="submit" disabled={loading}>
  {loading ? "Registering..." : "Register"}
</button>
{apiMessage && <div className="api-message">{apiMessage}</div>}

        <div className="signup-text">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;