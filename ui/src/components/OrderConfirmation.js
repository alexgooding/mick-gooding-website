import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import OrderConfirmationItem from "./OrderConfirmationItem";


const client = axios.create({
  headers: {
    get: {
      'Content-Type': "application/json",
    },
  },
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await client.get(`/paypal/orders/${orderId}`);
        setOrderData(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const data = await fetchOrderData();

        const allProductInfo = await Promise.all(
          data?.purchase_units[0]?.items.map(async (item) => {
            const productInfoResponse = await client.get(`/product/${item.sku}/all-info`);

            // Add item quantity from PayPal order
            productInfoResponse.data.quantity = item.quantity;

            return productInfoResponse.data;
          })
        );

        // Update products object with all relevant product information
        setProducts(allProductInfo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [orderId]);

  return (
    <div className="fluid-container p-4">
      <div className="row d-flex">
        <h2>Thanks for your order, {orderData?.payment_source?.paypal?.name?.given_name}!</h2>
      </div>
      <div className="row d-flex">
        <p>Your order <b>{orderId}</b> has been confirmed. A receipt has been sent to {orderData?.payment_source?.paypal?.email_address}.</p>
      </div>
      <div className="row">
        <h4>Order Details</h4>
        <hr></hr>
      </div>
      <div className="row mb-4">
        <div className="col p-0">
          <div className="row">
            <b>Shipping address</b>
          </div>
          <div className="row">
            <span>{orderData?.purchase_units[0]?.shipping?.name?.full_name}</span>
          </div>
          <div className="row">
            <span>{orderData?.purchase_units[0]?.shipping?.address?.address_line_1}</span>
          </div>
          <div className="row">
            <span>{orderData?.purchase_units[0]?.shipping?.address?.address_line_2}</span>
          </div>
          <div className="row">
            <span>{orderData?.purchase_units[0]?.shipping?.address?.address_line_3}</span>
          </div>
          <div className="row">
            <span>{orderData?.purchase_units[0]?.shipping?.address?.admin_area_3}</span>
          </div>
          <div className="row">
            <span>{orderData?.purchase_units[0]?.shipping?.address?.admin_area_2}</span>
          </div>
          <div className="row">
            <span>{orderData?.purchase_units[0]?.shipping?.address?.admin_area_1}</span>
          </div>
          <div className="row">
            <span>{orderData?.purchase_units[0]?.shipping?.address?.postal_code}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-8 flex-nowrap p-3 shadow rounded-4">
            {products.map((product) => {
              return <OrderConfirmationItem product={product} key={product.product_id}/>
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
                    £{orderData?.purchase_units[0]?.amount?.breakdown?.item_total?.value}
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
                    £{orderData?.purchase_units[0]?.amount?.breakdown?.shipping?.value}
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div className="row flex-nowrap mb-2">
              <div className="col">
                <div className="d-flex">
                  <b className="text-nowrap">
                    Total ({
                      orderData?.purchase_units[0]?.items?.reduce((total, item) => total + parseInt(item.quantity), 0) || 0
                    } items)
                  </b>
                </div>
              </div>
              <div className="col">
                <div className="d-flex justify-content-end">
                  <b>
                    £{orderData?.purchase_units[0]?.amount?.value}
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default OrderConfirmation;
