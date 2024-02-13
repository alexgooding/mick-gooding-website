import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import { useCart } from "../contexts/CartContext";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./CartIcon";


const NavBar = () => {
  const { getQuantityOfAllProducts } = useCart();
  const totalQuantity = getQuantityOfAllProducts();
  const [navbarCollapsed, setNavbarCollapsed] = useState(window.innerWidth < 992);
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

  // A method to collapse the navbar dropdown in collapsed mode
  const toggleNavbar = () => {
    if (navbarCollapsed) {
      const navbar = document.getElementById("primary-navbar");
      navbar.classList.remove("show");
    };
  };

  // Set the relevant cart element dependent on the state of the navbar
  if (navbarCollapsed) {
    cartCollapse = (
      <li className="nav-item">
        <Link to="/cart" className="nav-link" onClick={toggleNavbar}>
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
  };

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
        <div className="navbar-collapse collapse" id="primary-navbar">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={toggleNavbar}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={toggleNavbar}>
                Contact
              </Link>
            </li>
            {navbarCollapsed ? null :
            <li className="nav-item">
              <Link to="https://www.instagram.com/micksbestart" className="nav-link" target="_blank" rel="noreferrer">
                <FaInstagram />
              </Link>
            </li>
            }
            {navbarCollapsed ? null : 
            <li className="nav-item">
              <Link to="https://facebook.com/micksart" className="nav-link" target="_blank" rel="noreferrer">
                <FaFacebook />
              </Link>
            </li>
            }
            {navbarCollapsed ? null :
            <li className="nav-item">
              <Link to="mailto:contact@mickgooding.co.uk" className="nav-link" target="_blank" rel="noreferrer">
                <MdOutlineEmail />
              </Link>
             </li>
            }
            {cartCollapse}
            {navbarCollapsed ? 
            <li className="d-flex nav-item full-screen-width-container justify-content-center border-top">
              <Link to="https://www.instagram.com/micksbestart" className="nav-link px-2" target="_blank" rel="noreferrer">
                <FaInstagram />
              </Link>
              <Link to="https://facebook.com/micksart" className="nav-link px-2" target="_blank" rel="noreferrer">
                <FaFacebook />
              </Link>
              <Link to="mailto:contact@mickgooding.co.uk" className="nav-link p-2" target="_blank" rel="noreferrer">
                <MdOutlineEmail />
              </Link>
            </li> 
            : null}
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
