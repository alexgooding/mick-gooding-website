import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Painting from "./Painting";


const client = axios.create({
  baseURL: "http://localhost:5000/api"
});

const Home = () => {
  const [paintings, setPaintings] = useState([]);
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
  }, []);
  
  return (
    paintings.map((painting) => (
      <Painting key={painting.painting_id} painting={painting} products={painting.products} />
    ))
  );
}

export default Home;
