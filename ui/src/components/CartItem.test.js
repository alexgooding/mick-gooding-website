import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from './CartItem';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../contexts/CartContext', () => ({
  useCart: jest.fn().mockReturnValue({
    setQuantityOfProduct: jest.fn(),
  }),
}));

describe('CartItem component', () => {
  const product = {
    painting_id: 1,
    name: 'Test Painting',
    product_type: 'Canvas',
    price: 19.99,
    stock: 10,
    quantity: 3,
    product_id: 'product1',
  };

  beforeEach(() => {
    useNavigate.mockImplementation(() => jest.fn());
    useCart.mockImplementation(() => ({
      setQuantityOfProduct: jest.fn(),
    }));
  });

  test('renders the component correctly', () => {
    render(<CartItem product={product} />);
    expect(screen.getByText('Test Painting')).toBeInTheDocument();
    expect(screen.getByText('Canvas')).toBeInTheDocument();
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Painting: Test Painting/i })).toBeInTheDocument();
    expect(screen.getByTitle('Delete')).toBeInTheDocument();
    expect(screen.getByText('£59.97')).toBeInTheDocument();
  });

  test('navigates to the painting page when clicking on the image', () => {
    const navigateMock = jest.fn();
    useNavigate.mockImplementation(() => navigateMock);
    render(<CartItem product={product} />);
    fireEvent.click(screen.getByRole('img', { name: /Painting: Test Painting/i }));
    expect(navigateMock).toHaveBeenCalledWith('/s/1');
  });

  test('updates the quantity and calls setQuantityOfProduct', () => {
    const setQuantityOfProductMock = jest.fn();
    useCart.mockImplementation(() => ({
      setQuantityOfProduct: setQuantityOfProductMock,
    }));
    render(<CartItem product={product} />);
    fireEvent.change(screen.getByDisplayValue('3'), { target: { value: '5' } });
    expect(setQuantityOfProductMock).toHaveBeenCalledWith('product1', 5);
  });

  test('sets the quantity to the available stock if it exceeds the stock', () => {
    const setQuantityOfProductMock = jest.fn();
    useCart.mockImplementation(() => ({
      setQuantityOfProduct: setQuantityOfProductMock,
    }));
    render(<CartItem product={{ ...product, stock: 1 }} />);
    expect(setQuantityOfProductMock).toHaveBeenCalledWith('product1', 1);
  });

  test('removes the item from the cart when clicking the trash icon', () => {
    const setQuantityOfProductMock = jest.fn();
    useCart.mockImplementation(() => ({
      setQuantityOfProduct: setQuantityOfProductMock,
    }));
    render(<CartItem product={product} />);
    fireEvent.click(screen.getByTitle('Delete'));
    expect(setQuantityOfProductMock).toHaveBeenCalledWith('product1', 0);
  });
});
