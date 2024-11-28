import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(
            `http://localhost:8000/api/v1/user/login`,
            {
                email: input.email,
                password: input.password,
                role: input.role,  // Ensure the correct role is sent here
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        if (res.data.success) {
            dispatch(setUser(res.data.user));
            navigate("/"); // Redirect to home
            setInput({ email: "", password: "", role: "" });  // Reset input fields
        }
    } catch (error) {
        console.error("Login Error:", error.response?.data?.message || error.message);
    }
};

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home if already logged in
    }
    if(user?.role==='admin'){
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login to Scholar's Haven</h1>
      <form onSubmit={submitHandler} className="auth-form">
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
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-input"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            required
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
      <p className="auth-footer">
        Create an account? <a href="/signup" className="auth-link">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
