import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const client = axios.create({
  headers: {
    post: {
      'Content-Type': "application/json",
      'Prefer': "return=representation"
    }
  },
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const currencyCode = "GBP";

const initialPayPalOptions = {
  clientId: "test",
  currency: "GBP",
  intent: "capture",
};

const PaymentButtons = ({ cartData }) => {

  const navigate = useNavigate(); 

  const createOrder = async (data) => {

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
      console.log(res.data);
      alert("Transaction completed!");
    });
  }

  const onCancel = () => {
    navigate("/cart");
  }

  const onError = (err) => {
    navigate("/cart");
    console.log(`The following error occured: ${err}`);
  }

  return (
    <PayPalScriptProvider options={initialPayPalOptions}>
      <PayPalButtons
        style={{ tagline: false }}
        createOrder={createOrder}
        onApprove={onApprove}
        onCancel={onCancel}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}

export default PaymentButtons;
