import React from "react";
import { Link } from "react-router-dom";
import { CiShoppingBasket } from "react-icons/ci";

import { useCart } from "../contexts/CartContext";
import SearchBar from "./SearchBar";


const NavBar = () => {
  const { getQuantityOfAllProducts } = useCart();

  const totalQuantity = getQuantityOfAllProducts();

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
            <div className="container">
                <div className="row">
                <span className="">{totalQuantity}</span>
              </div>
              <div className="row">
                <Link to="#">
                  <CiShoppingBasket />
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
