import React from "react";

const Painting = ({ painting, products }) => {
  const imagePath = `${process.env.PUBLIC_URL}/images/low_res/${painting.painting_id}.gif`;
  const defaultImagePath = `${process.env.PUBLIC_URL}/images/low_res/default.jpg`

  return (
    <div>
      <img
        src={imagePath}
        alt={`Painting: ${painting.name}`}
        style={{ maxWidth: '100%', height: 'auto' }}
        onError={(e) => { e.target.src = defaultImagePath; }}
      />
      <h3>{painting.name}</h3>
      <select id="productDropdown">
        {products.map((product) => (
          <option key={product.product_id} value={product.product_id}>
            {product.product_type} - £{product.price}
          </option>
        ))}
      </select>
      <button>Add to Cart</button>
    </div>
  );
};

export default Painting;
