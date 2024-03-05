import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PiPackageFill } from "react-icons/pi";
import axios from "axios";

import { useCart } from "../contexts/CartContext";
import "../styles/Painting.css";
import "../styles/CommonImage.css"


const client = axios.create({
  headers: {
    get: {
      'Content-Type': "application/json",
    },
  },
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const Painting = () => {
  const { paintingId } = useParams();
  const { addToCart } = useCart();
  const [painting, setPainting] = useState({});
  const [products, setProducts] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  // Store selected product for use in adding to component
  const [selectedProduct, setSelectedProduct] = useState({});
  const [dropDownFocused, setDropDownFocused] = useState(false);
  const highResImagePath = `${process.env.PUBLIC_URL}/images/high_res/${painting.painting_id}.jpg`;

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);

    // Toggle the "locked" class on the body
    document.body.classList.toggle('locked', !fullScreen);
  };

  const fetchPainting = async () => {
    const url = `/paintings?painting_id=${paintingId}`;
    const response = await client.get(url);
    const paintingResponse = response.data[0];
    setPainting(paintingResponse);
    return paintingResponse;
  };

  const fetchProducts = async (paintingValue) => {
    const url = `/painting/${paintingValue.painting_id}/products`;
    const response = await client.get(url);
    setProducts(response.data);
  };

  const handleSelect = (e) => {
    let id = e?.target?.value;
    if (id) {
      let selectedProduct = products.find(d => d.product_id === parseInt(id));
      setSelectedProduct(selectedProduct);
    };
  };

  const handleAddToCart = () => {
    // Call the addToCart function here with selectedProductId
    addToCart(selectedProduct.product_id, 1);
  };

  // Fetch the relevant painting and associated products on initial render
  useEffect(() => {
    fetchPainting()
      .then((paintingResponse) => fetchProducts(paintingResponse))
      .catch((error) => {
        console.error('Error initializing page:', error);
      });
  }, [painting.painting_id]);

  // run handleSelect on initial render
  useEffect(() => {
    // Check if products have been updated
    if (products.length > 0) {
      handleSelect({
        target: {
          value: document.getElementById(`productDropdown_${painting.painting_id}`)?.value,
        },
      });
    }
  }, [products]);

  return (
    <div className="container p-3">
      <div className="row justify-content-md-center">
        <div className="col col-12 col-md-8 col-xl-7 col-xxl-6 p-3">
          <div className={`${fullScreen ? "full-screen" : "mt-auto"}`} onClick={toggleFullScreen}>
            <img
              src={highResImagePath}
              alt={`Painting: ${painting.name}`}
              className={`${fullScreen ? "full-screen-image" : "painting-image zoom-in-pointer"}`}
            />
          </div>
        </div>
        <div className="col col-12 col-md-4 p-3" style={{ "max-width": "450px" }}>
          <div className="row mb-2">
            <h2 className="px-1">{painting.name}</h2>
          </div>
          {
          painting.description && 
          <div className="row">
            <p className="px-1">{painting.description}</p>
          </div>
          }
          {
          selectedProduct.description && 
          <div className="row">
            <p className="px-1">{selectedProduct.description}</p>
          </div>
          }
          <div className="row mb-3">
            <select 
              id={`productDropdown_${painting.painting_id}`} 
              onChange={handleSelect} 
              onFocus={() => setDropDownFocused(true)} 
              onBlur={() => setDropDownFocused(false)}
            >
              <option value="" disabled selected hidden>
                Select a size
              </option>
              {products.map((product) => (
                <option key={product.product_id} value={product.product_id} disabled={!product.stock}>
                  {product.product_type} {dropDownFocused && `(£${parseFloat(product.price).toFixed(2)})`} {!product.stock && "[Sold out]"}
                </option>
              ))}
            </select>
          </div>
          <div className="row mb-3">
            <div className="text-muted small icon-link px-1">
              <PiPackageFill />
              {/* Set line height to ensure alignment with icon */}
              <span style={{ lineHeight: "1" }}>Delivery to United Kingdom only</span>
            </div>
          </div>
          <div className="row">
            <button 
              type="button" 
              className="btn btn-outline-dark btn-sm" 
              onClick={handleAddToCart}
              disabled={!selectedProduct.stock}>
                Add to basket {selectedProduct.price && `• £${parseFloat(selectedProduct.price).toFixed(2)}`} 
            </button>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Painting;
