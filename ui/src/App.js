import axios from "axios";
import { useState, useEffect } from "react";

import "./styles/App.css";
import Painting from "./components/Painting";

const client = axios.create({
  baseURL: "http://localhost:5000/api"
});

function App() {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await client.get("/paintings");
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
    <div className="App">
      <header className="App-header">
        {/* Render paintings and their related products using Painting component */}
        {paintings.map((painting) => (
          <Painting key={painting.painting_id} painting={painting} products={painting.products} />
        ))}
      </header>
    </div>
  );
}

export default App;
