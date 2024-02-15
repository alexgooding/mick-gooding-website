import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./styles/App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import About from "./components/About";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import OrderConfirmation from "./components/OrderConfirmation";
import { CartProvider } from "./contexts/CartContext";


export default function App() {
  return (
    <CartProvider>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/s" element={<SearchResults />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order/:orderId" element={<OrderConfirmation />} />
        </Routes>
      </div>
    </CartProvider>
  );
}
