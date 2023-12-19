import React, { useState, useEffect } from "react";
import axios from "axios";
import Painting from "./Painting";
import { useLocation } from "react-router-dom";

const client = axios.create({
  baseURL: "http://localhost:5000/api",
});

const Home = () => {
  const [paintings, setPaintings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const paintingsPerPage = 15;  // Update the number of paintings per page
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        // Modify the URL to include the 'name' parameter only if it exists
        const url = name ? `/paintings?name=${name}` : "/paintings";
        const response = await client.get(url);
        const paintingsData = response.data;

        // Fetch products for all paintings
        const paintingsWithProducts = await Promise.all(
          paintingsData.map(async (painting) => {
            const productsResponse = await client.get(`/painting/${painting.painting_id}/products`);
            const products = productsResponse.data;
            return { ...painting, products };
          })
        );

        // Update paintings object with all paintings and their products
        setPaintings(paintingsWithProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPaintings();
  }, [name]);

  const indexOfLastPainting = currentPage * paintingsPerPage;
  const indexOfFirstPainting = indexOfLastPainting - paintingsPerPage;
  const currentPaintings = paintings.slice(indexOfFirstPainting, indexOfLastPainting);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(paintings.length / paintingsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="container my-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        {currentPaintings.map((painting) => (
          <div key={painting.painting_id} className="col mb-4">
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
