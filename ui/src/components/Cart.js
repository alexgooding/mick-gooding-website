import React, { useState, useEffect } from "react";
import axios from "axios";

import { useCart } from "../contexts/CartContext";
import CartItem from "./CartItem";


const client = axios.create({
  baseURL: "http://localhost:5000/api",
});

const Cart = () => {
  const paypalLogoPath = `${process.env.PUBLIC_URL}/images/logos/transparent-paypal-logo.png`;
  const [products, setProducts] = useState([]);
  const [headerText, setHeaderText] = useState("");
  const { getAllProductIds, getQuantityOfProduct, getQuantityOfAllProducts } = useCart();
  const deliveryFee = 0;
  let cartTotal = 0;

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
    <div className="container mb-4">
      <div className="row my-4 text-center">
        <span>
          {headerText}
        </span>
      </div>
      <div className={products.length === 0 ? "invisible" : "row"}>
        <div className="col-12 col-sm-12 col-md-8 flex-nowrap p-3 shadow rounded-4">
          {products.map((product) => {
            cartTotal += getQuantityOfProduct(product.product_id) * product.price;

            return <CartItem product={product} key={product.product_id}/>
          })}
        </div>

        <div className="col col-12 col-sm-12 col-md-4 p-3">
          <div className="row flex-nowrap mb-2">
            <div className="d-flex">
              <b className="text-nowrap">Order Summary</b>
            </div>
          </div>
          <div className="row flex-nowrap">
            <div className="col">
              <div className="d-flex">
                <span className="text-nowrap">Item(s) total</span>
              </div>
            </div>
            <div className="col">
              <div className="d-flex justify-content-end">
                <span className="text-nowrap">
                  £{cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="row flex-nowrap">
            <div className="col">
              <div className="d-flex">
                <span className="text-nowrap">Delivery</span>
              </div>
            </div>
            <div className="col">
              <div className="d-flex justify-content-end">
                <span className="text-nowrap">
                  {deliveryFee === 0 ? "FREE" : `£${deliveryFee.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>
          <hr />
          <div className="row flex-nowrap mb-2">
            <div className="col">
              <div className="d-flex">
                <b className="text-nowrap">
                  Total ({getQuantityOfAllProducts()} items)
                </b>
              </div>
            </div>
            <div className="col">
              <div className="d-flex justify-content-end">
                <b>
                  £{(cartTotal + deliveryFee).toFixed(2)}
                </b>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="payment-button btn btn-dark w-100 p-2 rounded-5" type="submit">
                <span>
                  Pay with&nbsp;  
                  <img src={paypalLogoPath} width="50" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Cart;
