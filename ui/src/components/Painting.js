import React, { useState, useEffect } from "react";

import { useCart } from "../contexts/CartContext";
import "../styles/Painting.css";

const Painting = ({ painting, products }) => {
  const lowResImagePath = `${process.env.PUBLIC_URL}/images/low_res/${painting.painting_id}.jpg`;
  const highResImagePath = `${process.env.PUBLIC_URL}/images/high_res/${painting.painting_id}.jpg`;
  const defaultImagePath = `${process.env.PUBLIC_URL}/images/low_res/default.jpg`
  const [fullScreen, setFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);

    // Toggle the "locked" class on the body
    document.body.classList.toggle('locked', !fullScreen);
  };

  // Store product ID for use in adding to cart
  const [selectedProductId, setSelectedProductId] = useState("");

  const handleSelect = (e) => {
    setSelectedProductId(e.target.value)
  };

  // State for the quantity element
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, Math.min(10, value))); // Ensure quantity is between 1 and 10
  };

  // Run handleSelect on initial render
  useEffect(() => {
    handleSelect({
      target: {
        value: document.getElementById(`productDropdown_${painting.painting_id}`).value,
      },
    });
  }, []);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Call the addToCart function here with selectedProductId and quantity
    addToCart(selectedProductId, quantity);
  };

  return (
    <div className="painting-container">
      <div className={`painting-image-container ${fullScreen ? "full-screen" : ""}`} onClick={toggleFullScreen}>
        <img
          src={fullScreen ? highResImagePath : lowResImagePath}
          alt={`Painting: ${painting.name}`}
          className={`${fullScreen ? "full-screen-image" : "painting-image"}`}
          onError={(e) => { e.target.src = defaultImagePath; }}
        />
      </div>
      <div className="product-info-container">
        <h3 className="painting-name">{painting.name}</h3>
        <select id={`productDropdown_${painting.painting_id}`} className="product-dropdown" onChange={handleSelect}>
          {products.map((product) => (
            <option key={product.product_id} value={product.product_id}>
              {product.product_type} - £{product.price}
            </option>
          ))}
        </select>
        <div className="mx-auto quantity-elem">
          <div className="input-group">
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-number"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <span className="fa fa-minus fa-2xs"></span>
                </button>
              </span>
              <input
                type="text"
                className="quantity-input-box form-control input-number text-center"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                min="1"
                max="10"
              />
              <span className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-number"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <span className="fa fa-plus fa-2xs"></span>
                </button>
              </span>
          </div>
        </div>
        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Painting;
