import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from './components/NavBar';
import { CartProvider } from './contexts/CartContext';


export default function AppLayout() {
  return (
    <CartProvider>
      <NavBar />
      <Outlet />
    </CartProvider>
  );
}
