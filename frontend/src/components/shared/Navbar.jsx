import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth); // Accessing user state from Redux
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Toggle profile popup visibility
  const togglePopup = () => setIsPopupOpen((prev) => !prev);

  // Handle user logout
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Navigation links for different user roles
  const renderLinks = () => {
    if (user) {
      return user.role === "user" ? (
        <>
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/books" className="navbar-link">
            Books
          </Link>
          <Link to="/purchased" className="navbar-link">
            Purchased
          </Link>
        </>
      ) : (
        <>
          <Link to="/dashboard" className="navbar-link">
            Dashboard
          </Link>
          <Link to="/transaction" className="navbar-link">
            Transaction
          </Link>
          <Link to="/bookissued" className="navbar-link">
            Book Issued
          </Link>
        </>
      );
    }
    return (
      <>
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/books" className="navbar-link">
          Books
        </Link>
        <Link to="/purchased" className="navbar-link">
          Purchased
        </Link>
      </>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Section */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-title">
            Book Worm
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">{renderLinks()}</div>

        {/* Profile Section */}
        <div className="navbar-profile">
          {user ? (
            <div className="profile-container" onClick={togglePopup}>
              <div className="profile-circle">
                {user.name?.charAt(0).toUpperCase() || "S"}
              </div>
              {isPopupOpen && (
                <div className="profile-popup">
                  <p>
                    <strong>Name:</strong> {user.fullname || "John Doe"}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email || "johndoe@example.com"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phoneNumber || "+123456789"}
                  </p>
                  <button onClick={logoutHandler} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
