import React from "react";

import "../styles/Painting.css";

const Painting = ({ painting, products }) => {
  const imagePath = `${process.env.PUBLIC_URL}/images/low_res/${painting.painting_id}.gif`;
  const defaultImagePath = `${process.env.PUBLIC_URL}/images/low_res/default.jpg`

  return (
    <div className="painting-container">
      <img
        src={imagePath}
        alt={`Painting: ${painting.name}`}
        className="painting-image"
        onError={(e) => { e.target.src = defaultImagePath; }}
      />
      <div className="product-info-container">
        <h3 className="painting-name">{painting.name}</h3>
        <select id="productDropdown" className="product-dropdown">
          {products.map((product) => (
            <option key={product.product_id} value={product.product_id}>
              {product.product_type} - £{product.price}
            </option>
          ))}
        </select>
        <button className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default Painting;
