import React from "react";
import { Link } from "react-router-dom";

import { useCart } from "../contexts/CartContext";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./CartIcon";


const NavBar = () => {
  const { getQuantityOfAllProducts } = useCart();

  const totalQuantity = getQuantityOfAllProducts();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
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
            <Link to="/cart">
              <ShoppingCartIcon value={totalQuantity} className="shopping-cart"/>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
