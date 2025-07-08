import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        return;
      }

      const res = await axios.post("http://localhost:9000/api/user/login", {
        userName: formData.email,
        password: formData.password,
      });
      if (res) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.data);
        toast.success("Login successfully");
        window.location.href = "/";
      }
    } catch (error) {
      console.log("login error", error);
      toast.error(error?.response?.data?.mess || "Failed to Login");
    }
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        className="p-4 shadow-lg w-100"
        style={{
          maxWidth: "400px",
          borderRadius: "16px",
        }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">
          Admin Login
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold text-dark">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold text-dark">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn btn-outline-light border"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
                tabIndex={-1}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-2 fw-semibold">
            Login
          </button>
        </form>
        <p
          className="text-center mt-3 text-dark"
          style={{ fontSize: "0.85rem", opacity: 0.8 }}
        >
          Only authorized admins can access this panel.
        </p>
      </div>
    </div>
  );
};

export default Login;
