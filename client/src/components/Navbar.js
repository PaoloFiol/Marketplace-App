// client/src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated }) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload(); // Refresh the page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Marketplace
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-3">
            {user ? (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/list-product">
                    List Product
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/my-products">
                    My Products
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/profile">
                    My Profile
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/cart">
                    Shopping Cart
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <button
                    className="btn btn-link nav-link p-0 align-middle"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
