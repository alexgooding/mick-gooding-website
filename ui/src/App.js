import axios from "axios";
import { useState, useEffect } from 'react';

import './App.css';
import Painting from './Painting';

function App() {
  const client = axios.create({
    baseURL: "http://localhost:5000/api"
  });

  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await client.get("/paintings");
        const paintingsData = response.data;

        // For each painting, fetch related products
        for (const painting of paintingsData) {
          const productsResponse = await client.get(`/painting/${painting.painting_id}/products`);
          const products = productsResponse.data;
        
          // Update paintings object dynamically for faster page load
          setPaintings(prevPaintings => [
            ...prevPaintings,
            { ...painting, products }
          ]);
        }
        
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
