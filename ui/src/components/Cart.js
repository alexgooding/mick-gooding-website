import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useCart } from "../contexts/CartContext";
import CartItem from "./CartItem";
import PaymentButtons from "./PaymentButtons";


const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [headerText, setHeaderText] = useState("");  
  const [keyForPaymentButtons, setKeyForPaymentButtons] = useState(0);
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

            // Retrieve and add quantity to the productInfoResponse.data for checkout
            const quantity = getQuantityOfProduct(productId);
            productInfoResponse.data.quantity = quantity;

            return productInfoResponse.data;
          })
        );

        // Update products object with all relevant product information
        setProducts(allProductInfo);
        setKeyForPaymentButtons((prevKey) => prevKey + 1);
        setHeaderText(`${getQuantityOfAllProducts()} items in your basket`);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch products on initial render
    fetchProducts();
    // Display alert if an item went out of stock during payment
    if (sessionStorage.outOfStockAlert == "true") {
      alert("An item in your basket is no longer in stock. Please checkout again.");
      sessionStorage.outOfStockAlert = false;
    };
  }, [getAllProductIds]);

  return (
    <div>
      <Helmet>
        <title>Basket</title>
        <meta
          name="description"
          content="View and modify the contents of your basket. Click one of the payment buttons to checkout with PayPal."
        />
      </Helmet>
      <div className="container p-3 mb-3">
        <div className="row mb-2 text-center">
          <span className="p-3">
            {headerText}
          </span>
        </div>
        <div className={products.length === 0 ? "invisible" : "row"}>
          <div className="col-12 col-sm-12 col-md-8 flex-nowrap p-3 mb-3 shadow rounded-4">
            {products.map((product) => {
              cartTotal += product.quantity * product.price;

              return <CartItem product={product} key={product.product_id}/>
            })}
          </div>

          <div className="col col-12 col-sm-12 col-md-4 p-3 pb-0">
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
                  <span className="text-nowrap">Delivery (UK only)</span>
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
                {products.length > 0 && (
                  <PaymentButtons cartData={products} key={keyForPaymentButtons} />
                )}
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default Cart;
