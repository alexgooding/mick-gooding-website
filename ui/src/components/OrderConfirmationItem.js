import React from "react";

import "../styles/CommonImage.css"

const OrderConfirmationItem = ({ product }) => {
  const lowResImagePath = `${process.env.PUBLIC_URL}/images/low_res/${product.painting_id}.jpg`;
  const defaultImagePath = `${process.env.PUBLIC_URL}/images/low_res/default.jpg`

  return (
    <div className="row flex-nowrap">
      <div className="col col-9 p-4">
        <div className="card border-0">
          <div className="row g-0">
            <div className="col col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 d-flex align-items-center justify-content-center">
              <div className={"img-fluid rounded-start ratio ratio-1x1"}>
                <img
                  src={lowResImagePath}
                  alt={`Painting: ${product.name}`}
                  className={"cart-item-image"}
                  onError={(e) => { e.target.src = defaultImagePath; }}
                />
              </div>
            </div>
            <div className="col col-12 col-sm-5 col-md-6 col-lg-7 col-xl-8">
              <div className="card-body py-sm-0">
                <b className="card-text description-item d-flex flex-nowrap">{product.name}</b>
                <span className="card-text description-item d-flex flex-nowrap">{product.product_type}</span>
                <span className="card-text description-item d-flex flex-nowrap">Quantity: {product.quantity}</span>
              </div>
            </div> 
          </div>
        </div>
      </div>
      <div className="col col-3 p-4">
        <div className="d-flex justify-content-end">
          <span>£{(product.price * product.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationItem;
