import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";

import { useCart } from "../contexts/CartContext";
import "../styles/CartItem.css";
import "../styles/CommonImage.css"

const CartItem = ({ product }) => {
  const lowResImagePath = `${process.env.PUBLIC_URL}/images/low_res/${product.painting_id}.jpg`;
  const defaultImagePath = `${process.env.PUBLIC_URL}/images/low_res/default.jpg`
  const { setQuantityOfProduct } = useCart();
  const navigate = useNavigate(); 

  const navigateToPainting = () => {
    navigate(`/s/${product.painting_id}`);
  }

  // State for the quantity element
  const [quantity, setQuantity] = useState(product.quantity);

  const handleQuantityChange = (value) => {
    setQuantity(value); // Update state
    setQuantityOfProduct(product.product_id, value); // Update in local storage
  };

  return (
    <div className="row flex-nowrap">
      <div className="col col-9 p-4">
        <div className="card border-0">
          <div className="row g-0">
            <div className="col col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 d-flex align-items-center justify-content-center">
              <div className="img-fluid rounded-start ratio ratio-1x1">
                <img
                  src={lowResImagePath}
                  alt={`Painting: ${product.name}`}
                  className="cart-item-image"
                  onClick={navigateToPainting}
                  style={{ "cursor": "pointer" }}
                  onError={(e) => { e.target.src = defaultImagePath; }}
                />
              </div>
            </div>
            <div className="col col-12 col-sm-5 col-md-6 col-lg-7 col-xl-8">
              <div className="card-body py-sm-0">
                <b 
                  className="card-text description-item d-flex flex-nowrap" 
                  onClick={navigateToPainting}
                  style={{ "cursor": "pointer" }}
                >
                  {product.name}
                </b>
                <span className="card-text description-item d-flex flex-nowrap">{product.product_type}</span>
                <div className="card-text description-item d-flex">
                  <label htmlFor="quantitySelect" className="me-2">Quantity:</label>
                  <select id="quantitySelect" defaultValue={quantity} onChange={(e) => handleQuantityChange(parseInt(e.target.value))}>
                    {[...Array(11).keys()].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="card-text description-item d-flex">
                  <button className="icon-button" title="Delete" onClick={(e) => handleQuantityChange(0)}>
                    <CiTrash className="trash-icon"/>
                  </button>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
      <div className="col col-3 p-4">
        <div className="d-flex justify-content-end">
          <span>£{(product.price * quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
