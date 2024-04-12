import React from 'react';
import { render, screen } from '@testing-library/react';
import CartIcon from './CartIcon';

describe('CartIcon component', () => {
  test('renders without errors', () => {
    render(<CartIcon value={3} />);
    expect(screen.getByRole('img', { name: 'Shopping cart icon' })).toBeInTheDocument();
  });

  test('displays the correct quantity value', () => {
    render(<CartIcon value={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('renders the CiShoppingBasket component', () => {
    render(<CartIcon value={1} />);
    expect(screen.getByRole('img', { name: 'Shopping cart icon' })).toBeInstanceOf(SVGSVGElement);
  });
});
