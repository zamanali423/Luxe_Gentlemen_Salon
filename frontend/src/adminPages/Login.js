import React, { useContext, useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { productContext } from "../context/productContext/productContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, role, setRole } = useContext(productContext);
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://luxe-barber-shop-backend.vercel.app/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputFields, role }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.msg);
        setIsSubmitting(false);
        return;
      }
      console.log(data);
      if (
        inputFields.email !== data.user.email ||
        inputFields.password !== data.user.password
      ) {
        toast.error("Invalid email or password");
      } else {
        const token = data.token;
        setToken(token);
        localStorage.setItem("token", token);
        navigate("/admin");
        toast.success(data.msg);
        setInputFields({ email: "", password: "" });
        setRole("");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mainLogin">
      <div className="login-container">
        <h2 className="loginHead" style={{ marginTop: "6rem" }}>
          Login
        </h2>
        <form onSubmit={handleSubmit} className="formLogin">
          <input
            className="input"
            type="email"
            placeholder="Email Address"
            name="email"
            value={inputFields.email}
            onChange={handleInput}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            name="password"
            value={inputFields.password}
            onChange={handleInput}
            required
          />
          <select
            className="input"
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="manager">Manager</option>
            <option value="owner">Owner</option>
          </select>
          <button type="submit" disabled={isSubmitting} className="login">
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <div className="back">
            <Link to="/" className="login">
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
