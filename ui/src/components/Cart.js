import React, { useState, useEffect } from "react";
import axios from "axios";

import { useCart } from "../contexts/CartContext";
import CartItem from "./CartItem";


const client = axios.create({
  baseURL: "http://localhost:5000/api",
});

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [headerText, setHeaderText] = useState("");
  const { getAllProductIds, getQuantityOfAllProducts } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productIds = getAllProductIds();
        const allProductInfo = await Promise.all(
          productIds.map(async (productId) => {
            const productInfoResponse = await client.get(`/product/${productId}/all-info`);
            return productInfoResponse.data;
          })
        );

        // Update products object with all relevant product information
        setProducts(allProductInfo);
        setHeaderText(`${getQuantityOfAllProducts()} items in your basket`);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch products on initial render
    fetchProducts();
  }, [getAllProductIds]);

  return (
    <div className="container">
      <div className="row my-4">
        <span>
          {headerText}
        </span>
      </div>
      <div className={products.length === 0 ? "invisible" : "row row-cols-1 shadow rounded-4"}>
      {products.map((product) => (
        <CartItem product={product} key={product.product_id}/>
      ))}
      </div>  
    </div>
  );
};

export default Cart;
