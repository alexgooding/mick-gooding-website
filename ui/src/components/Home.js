import React, { useState, useEffect } from "react";
import axios from "axios";
import Painting from "./Painting";
import { useLocation } from "react-router-dom";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const Home = () => {
  const [paintings, setPaintings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsText, setResultsText] = useState("");
  const paintingsPerPage = 15;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');

  // Function to set initial state from cached data
  const setInitialStateFromCache = () => {
    const cacheKey = name ? `paintings_${name}` : "paintings";
    const cachedPaintings = localStorage.getItem(cacheKey);
    if (cachedPaintings) {
      setPaintings(JSON.parse(cachedPaintings));
    }
  };

  // Function to fetch paintings and update state
  const fetchPaintings = async (abortController) => {
    try {
      // Set results text to nothing until it is determined
      setResultsText("");
      
      const url = name ? `/paintings?name=${name}` : "/paintings";
      const response = await client.get(url, { signal: abortController.signal });
      const paintingsData = response.data;

      const paintingsWithProducts = await Promise.all(
        paintingsData.map(async (painting) => {
          const productsResponse = await client.get(`/painting/${painting.painting_id}/products`, { signal: abortController.signal });
          const products = productsResponse.data;
          return { ...painting, products };
        })
      );

      // Update paintings object with all paintings and their products
      setPaintings(paintingsWithProducts);

      // Cache the paintings data in localStorage
      const cacheKey = name ? `paintings_${name}` : "paintings";
      localStorage.setItem(cacheKey, JSON.stringify(paintingsWithProducts));
    
      // Call generateResultsText after paintings have been updated
      generateResultsText(paintingsWithProducts.length, name);
    } catch (error) {
      console.error(error);
    }
  };

  // Function for determining results header
  const generateResultsText = (resultsLength, searchText) => {
    let resultsText = "";

    if (resultsLength === 0) {
      resultsText = `No results found for '${searchText}'.`;
    } 
    else if (searchText) {
      resultsText = `${resultsLength} results found for '${name}'...`;
    }

    setResultsText(resultsText);
  };

  // Effect for initial render and background data fetching
  useEffect(() => {
    const abortController = new AbortController();
    setInitialStateFromCache();
    fetchPaintings(abortController);

    return function cleanup() {
      abortController.abort();
    }
  }, [name]);

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPainting = currentPage * paintingsPerPage;
  const indexOfFirstPainting = indexOfLastPainting - paintingsPerPage;
  const currentPaintings = paintings.slice(indexOfFirstPainting, indexOfLastPainting);

  const totalPages = Math.ceil(paintings.length / paintingsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="container mb-4">
      <div className="d-flex justify-content-center my-4">
        <span>
          {resultsText}
        </span>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        {currentPaintings.map((painting) => (
          <div key={painting.painting_id} className="col p-4">
            <Painting painting={painting} products={painting.products} />
          </div>
        ))}
      </div>
      {/* Page navigation bar */}
      <div className="d-flex justify-content-center mt-4">
        {/* Previous button */}
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {/* Page buttons and ellipsis rendering */}
        {pageNumbers.map((pageNumber) => {
          if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
            return (
              <button
                key={pageNumber}
                className={`btn ${currentPage === pageNumber ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
            return (
              <span key={pageNumber} className="me-2">...</span>
            );
          } else {
            return null;
          }
        })}
        {/* Next button */}
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
