import React from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";


const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Mick Gooding Art
      </Link>
      <div className="navbar collapse navbar-collapse w-100" id="navbar">
        <ul className="navbar-nav align-items-center">
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
          <li className="nav-item">
            <SearchBar />
          </li>
        </ul>
        <ul className="navbar-nav align-items-center ms-auto">
          <li className="nav-item">
            <Link to="#">
              <i className="fas fa-shopping-cart fa-lg"></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
