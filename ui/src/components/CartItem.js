import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";

import { useCart } from "../contexts/CartContext";
import "../styles/CartItem.css";
import "../styles/CommonImage.css"

const CartItem = ({ product }) => {
  const lowResImagePath = `${process.env.PUBLIC_URL}/images/low_res/${product.painting_id}.jpg`;
  const highResImagePath = `${process.env.PUBLIC_URL}/images/high_res/${product.painting_id}.jpg`;
  const defaultImagePath = `${process.env.PUBLIC_URL}/images/low_res/default.jpg`
  const [fullScreen, setFullScreen] = useState(false);
  const { getQuantityOfProduct, setQuantityOfProduct } = useCart();

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);

    // Toggle the "locked" class on the body
    document.body.classList.toggle('locked', !fullScreen);
  };

  // State for the quantity element
  const [quantity, setQuantity] = useState(getQuantityOfProduct(product.product_id));

  const handleQuantityChange = (value) => {
    setQuantity(value); // Update state
    setQuantityOfProduct(product.product_id, value); // Update in local storage
  };

  return (
    <div className="row flex-nowrap">
      <div className="col p-4">
        <div className="d-flex">
          <div className={`painting-image-container ${fullScreen ? "full-screen" : ""}`} onClick={toggleFullScreen}>
            <img
              src={fullScreen ? highResImagePath : lowResImagePath}
              alt={`Painting: ${product.name}`}
              className={`${fullScreen ? "full-screen-image" : "cart-item-image"}`}
              onError={(e) => { e.target.src = defaultImagePath; }}
            />
          </div>
          <div className="flex-column ms-4">
            <div className="row">
              <div className="d-flex description-item">
                <b>{product.name}</b>
              </div>
            </div>
            <div className="row">
              <div className="d-flex description-item">
                <span>{product.product_type}</span>
              </div>
            </div>
            <div className="row">
              <div className="d-flex description-item">
                <label htmlFor="quantitySelect" className="me-2">Quantity:</label>
                <select id="quantitySelect" defaultValue={quantity} onChange={(e) => handleQuantityChange(parseInt(e.target.value))}>
                  {[...Array(11).keys()].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="d-inline-flex">
                <button className="icon-button" title="Delete" onClick={(e) => handleQuantityChange(0)}>
                  <CiTrash className="trash-icon"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col p-4">
        <div className="d-flex justify-content-end">
          <span>£{(product.price * quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
