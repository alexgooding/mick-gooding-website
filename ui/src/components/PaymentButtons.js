import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const client = axios.create({
  headers: {
    post: {
      'Content-Type': "application/json"
    }
  },
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const initialPayPalOptions = {
  clientId: "test",
  currency: "GBP",
  intent: "capture",
};

const PaymentButtons = ({ cartData }) => {

  const navigate = useNavigate(); 

  const createOrder = async (data) => {
    const response = await client.post("/paypal/orders/create", 
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "GBP",
            value: "0.01"
          }
        }
      ]
    });

    return response.data
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
    alert(`The following error occured: ${err}`);
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
