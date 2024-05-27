import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import OrderConfirmation from './OrderConfirmation';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
  useParams: () => ({orderId: '12345'}),
}));

describe('OrderConfirmation', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render the order confirmation page with the correct details', async () => {
    const mockedOrderData = {
      data: {
        orderId: '12345',
        payment_source: {
          paypal: {
            name: {
              given_name: 'John Doe',
            },
            email_address: 'johndoe@example.com',
          },
        },
        purchase_units: [
          {
            shipping: {
              name: {
                full_name: 'John Doe',
              },
              address: {
                address_line_1: '123 Main St',
                address_line_2: 'Apt 4',
                address_line_3: '',
                admin_area_3: 'City',
                admin_area_2: 'State',
                admin_area_1: 'Country',
                postal_code: 'CB6 666',
              },
            },
            amount: {
              breakdown: {
                item_total: {
                  value: '80.00',
                },
                shipping: {
                  value: '5.00',
                },
              },
              value: '85.00',
            },
            items: [
              {
                sku: 'product-1',
                quantity: 2,
              },
              {
                sku: 'product-2',
                quantity: 1,
              },
            ],
          },
        ],
      }
    };

    const mockedProductData = [
      { 
        data: {
          product_id: 'product-1',
          name: 'Product 1',
          price: '25.00',
          quantity: 2,
        }
      },
      {
        data: {
          product_id: 'product-2',
          name: 'Product 2',
          price: '30.00',
          quantity: 1,
        }
      },
    ];

    axios.get.mockResolvedValueOnce(mockedOrderData);
    axios.get.mockResolvedValueOnce(mockedProductData[0]);
    axios.get.mockResolvedValueOnce(mockedProductData[1]);

    render(<OrderConfirmation />);

    await waitFor(() => {
      expect(screen.getByText(/thanks for your order, john doe!/i )).toBeInTheDocument();
      expect(screen.getByText(/your order has been confirmed\. a receipt has been sent to johndoe@example\.com\./i)).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
      expect(screen.getByText('Apt 4')).toBeInTheDocument();
      expect(screen.getByText('City')).toBeInTheDocument();
      expect(screen.getByText('State')).toBeInTheDocument();
      expect(screen.getByText('Country')).toBeInTheDocument();
      expect(screen.getByText('CB6 666')).toBeInTheDocument();
      expect(screen.getByText('£5.00')).toBeInTheDocument();
      expect(screen.getByText('£85.00')).toBeInTheDocument();

      expect(axios.get).toHaveBeenCalledWith('/paypal/orders/12345');
      expect(axios.get).toHaveBeenCalledWith('/product/product-1/all-info');
      expect(axios.get).toHaveBeenCalledWith('/product/product-2/all-info');
    });
  });

  test('should navigate back to the home page if the order cannot be found', async () => {
    axios.get.mockRejectedValueOnce(new Error('Order not found'));

    render(<OrderConfirmation />);

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });
  });
});
