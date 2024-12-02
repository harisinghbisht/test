import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { logout } from '../features/auth/authSlice';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Blogers
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {isAuthenticated && (
            <Link to="/add" className="nav-link">
              Add Blog
            </Link>
          )}
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-link logout-button">
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
