import React from 'react';

const Painting = ({ painting, products }) => {
  return (
    <div>
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
