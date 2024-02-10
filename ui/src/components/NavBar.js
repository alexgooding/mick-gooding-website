import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../contexts/CartContext";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./CartIcon";

const NavBar = () => {
  const { getQuantityOfAllProducts } = useCart();
  const totalQuantity = getQuantityOfAllProducts();
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  const navbarBrandLogo = `${process.env.PUBLIC_URL}/images/logos/mick_sig_1.png`
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
      <div className="d-flex align-items-right ps-3 pt-2">
        <Link to="/cart">
          <ShoppingCartIcon value={totalQuantity} className="shopping-cart" />
        </Link>
      </div>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-x-light bg-gradient border-bottom">
      <div className="container-fluid">
        <div className={navbarCollapsed ? "d-flex flex-grow-1 align-items-center" : "d-flex"}>
          <Link to="/" className="navbar-brand me-auto">
            <img src={navbarBrandLogo} alt="Mick Signature Logo" height="45" />
          </Link>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-2">
              {navbarCollapsed ? <SearchBar /> : null}
            </li>
          </ul>
          <button
            className="navbar-toggler border-0 ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#primary-navbar"
            aria-controls="primary-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="navbar-collapse" id="primary-navbar">
          <ul className="navbar-nav mx-auto">
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
            <li className="nav-item mx-2">
              {navbarCollapsed ? null : <SearchBar />}
            </li>
          </ul>
        </div>
        {/* Place cart icon in its own container with the same width as the navbar brand. 
            This allows the primary navbar to be completely central in the parent container*/}
        {cartNav}
      </div>
    </nav>
  );
};

export default NavBar;
