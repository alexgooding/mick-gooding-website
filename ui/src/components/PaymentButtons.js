import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { useCart } from "../contexts/CartContext";


const currencyCode = "GBP";

const initialPayPalOptions = {
  clientId: "test",
  currency: "GBP",
  locale: "en_GB",
  intent: "capture",
};

const client = axios.create({
  headers: {
    post: {
      'Content-Type': "application/json"
    }
  },
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const PaymentButtons = ({ cartData }) => {

  const { clearCart } = useCart();
  const navigate = useNavigate(); 

  const createOrder = async (data) => {

    // Check that all products in the cart are still in stock before proceeding with payment
    for (let product of cartData) {
      let response = await client.get(`/product/${product.product_id}/stock`);
      let currentStock = response.data;
      if (currentStock < product.quantity) {
        window.location.reload();
      };
    };

    const cartTotal = cartData.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          items: cartData.map((product) => ({
            name: product.name,
            quantity: product.quantity,
            description: product.description,
            sku: product.product_id,
            unit_amount: {
              currency_code: currencyCode,
              value: product.price
            }
          })),
          amount: {
            currency_code: currencyCode,
            value: cartTotal,
            breakdown: {
              item_total: {
                currency_code: currencyCode,
                value: cartTotal
              },
              shipping: {
                currency_code: currencyCode,
                value: 0
              }
            },
          },
        },
      ],
    };

    const response = await client.post("/paypal/orders/create", orderData);

    return response.data;
  };

  const onApprove = async (data) => {
    return await client.post(`/paypal/orders/${data.orderID}/capture`)
    .then((res) => {
      // Update stock for purchased products in the DB
      for (let product of cartData) {
        let newStock = product.stock - product.quantity;
        client.put(`/product/${product.product_id}/update-stock/${newStock}`); 
      };
      clearCart();
      navigate(`/order/${res.data.id}`);
    });
  }

  const onCancel = () => {
    navigate("/cart");
  }

  const onError = (err) => {
    navigate("/cart");
    console.log(`The following error occured: ${err}`);
  }

  const onShippingAddressChange = (data, actions) => {
    if (data.shippingAddress.countryCode !== "GB") {
      return actions.reject(data.errors.COUNTRY_ERROR);
    };
  }

  return (
    <PayPalScriptProvider options={initialPayPalOptions}>
      <PayPalButtons
        style={{ tagline: false }}
        createOrder={createOrder}
        onApprove={onApprove}
        onCancel={onCancel}
        onError={onError}
        onShippingAddressChange={onShippingAddressChange}
      />
    </PayPalScriptProvider>
  );
}

export default PaymentButtons;
