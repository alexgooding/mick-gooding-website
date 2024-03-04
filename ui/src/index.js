import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './components/Home';
import SearchResults from './components/SearchResults';
import Painting from './components/Painting';
import About from './components/About';
import Cart from './components/Cart';
import Contact from './components/Contact';
import OrderConfirmation from './components/OrderConfirmation';

import './styles/index.css';
import AppLayout from './AppLayout';
import reportWebVitals from './reportWebVitals';

const routes = [
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/s',
        element: <SearchResults />,
      },
      {
        path: '/s/:paintingId',
        element: <Painting />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/order/:orderId',
        element: <OrderConfirmation />,
      },
    ]
  }
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
