import React, { useState, useEffect } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

import { useCart } from "../contexts/CartContext";
import "../styles/Painting.css";
import "../styles/CommonImage.css"

const Painting = ({ painting, products }) => {
  const lowResImagePath = `${process.env.PUBLIC_URL}/images/low_res/${painting.painting_id}.jpg`;
  const highResImagePath = `${process.env.PUBLIC_URL}/images/high_res/${painting.painting_id}.jpg`;
  const defaultImagePath = `${process.env.PUBLIC_URL}/images/default.jpg`
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
  }, [painting.painting_id]);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Call the addToCart function here with selectedProductId and quantity
    addToCart(selectedProductId, quantity);
  };

  return (
    <div className="d-flex flex-column h-100 text-center">
      <div className={`${fullScreen ? "full-screen" : "mt-auto"}`}>
        <img
          src={fullScreen ? highResImagePath : lowResImagePath}
          alt={`Painting: ${painting.name}`}
          className={`${fullScreen ? "full-screen-image" : "painting-image zoom-in-pointer"}`}
          onClick={toggleFullScreen}
          onError={(e) => { e.target.src = defaultImagePath; }}
        />
      </div>
      <div>
        <h4 className="mt-3">{painting.name}</h4>
        <select id={`productDropdown_${painting.painting_id}`} className="mt-2" onChange={handleSelect}>
          {products.map((product) => (
            <option key={product.product_id} value={product.product_id}>
              {product.product_type} - £{parseFloat(product.price).toFixed(2)}
            </option>
          ))}
        </select>
        <div className="quantity-elem mt-2 mx-auto">
          <div className="input-group">
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn border-0 bg-transparent"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <CiCircleMinus />
                </button>
              </span>
              <input
                type="text"
                className="form-control input-number text-center border-0"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                min="1"
                max="10"
              />
              <span className="input-group-append">
                <button
                  type="button"
                  className="btn border-0 bg-transparent"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <CiCirclePlus />
                </button>
              </span>
          </div>
        </div>
        <button type="button" className="btn btn-outline-dark btn-sm mt-2" onClick={handleAddToCart}>Add to basket</button>
      </div>
    </div>
  );
};

export default Painting;
