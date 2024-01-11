import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../contexts/CartContext";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./CartIcon";

const NavBar = () => {
  const { getQuantityOfAllProducts } = useCart();
  const totalQuantity = getQuantityOfAllProducts();
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  let cartCollapse = null;
  let cartNav = null;

  useEffect(() => {
    // Handle window being resized dynamically
    const handleResize = () => {
      const shouldCollapse = window.innerWidth < 992;
      setNavbarCollapsed(shouldCollapse);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set the relevant cart element dependent on the state of the navbar
  if (navbarCollapsed) {
    cartCollapse = (
      <li className="nav-item">
        <Link to="/cart" className="nav-link">
          Cart ({totalQuantity})
        </Link>
      </li>
    );
  } else {
    cartNav = (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link to="/cart">
            <ShoppingCartIcon value={totalQuantity} className="shopping-cart" />
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Mick Gooding Art
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#primary-navbar"
          aria-controls="primary-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse" id="primary-navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                Contact
              </Link>
            </li>
            {cartCollapse}
            <li className="nav-item">
              <SearchBar />
            </li>
          </ul>
          {cartNav}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
