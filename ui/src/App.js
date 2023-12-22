import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/App.css";
import NavBar from "./components/NavBar";
import Home from './components/Home';
import About from './components/About';
import { CartProvider } from './contexts/CartContext';


export default function App() {
  return (
    <CartProvider>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </CartProvider>
  );
}
