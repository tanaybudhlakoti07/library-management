import React, { useState, useEffect } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        setInput({
          fullname: "",
          email: "",
          phoneNumber: "",
          password: "",
          role: "",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="auth-container">
      <h1 className="auth-title">Create an Account</h1>
      <form onSubmit={submitHandler} className="auth-form">
        <div className="form-group">
          <label htmlFor="fullname" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            className="form-input"
            value={input.fullname}
            onChange={changeEventHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={input.email}
            onChange={changeEventHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="form-input"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={input.password}
            onChange={changeEventHandler}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Role</label>
          <div className="role-options">
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={input.role === "user"}
                onChange={changeEventHandler}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={input.role === "admin"}
                onChange={changeEventHandler}
              />
              Admin
            </label>
          </div>
        </div>
        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>
      <p className="auth-footer">
        Already have an account? <a href="/login" className="auth-link">Login</a>
      </p>
    </div>
  );
};

export default Signup;
