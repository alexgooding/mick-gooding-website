import { Routes, Route } from 'react-router-dom';

import "./styles/App.css";
import NavBar from "./components/NavBar";
import Home from './components/Home';
import About from './components/About';


export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
