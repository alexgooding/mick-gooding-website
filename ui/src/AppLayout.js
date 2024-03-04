import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { CartProvider } from './contexts/CartContext';


const AppLayout = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes('/s')) {
      for (let key in sessionStorage) {
        if (key.includes('storeScrollPosition')) {
          sessionStorage.removeItem(key);
        };
      };
    };
  }, [location]);

  return (
    <CartProvider>
      <NavBar />
      <Outlet />
      <Footer />
    </CartProvider>
  );
}

export default AppLayout;
