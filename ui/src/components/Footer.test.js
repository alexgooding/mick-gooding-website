import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  beforeEach(() => {
    // Mock the Date object to control the output of the getYear function
    jest.spyOn(global, 'Date').mockImplementation(() => ({
      getFullYear: () => 2023,
    }));
  });

  afterEach(() => {
    // Restore the original Date object
    jest.restoreAllMocks();
  });

  test('renders without errors', () => {
    render(<Footer />);
  });

  test('displays the correct text', () => {
    render(<Footer />);
    expect(screen.getByText('© 2023 Mick Gooding Art. All rights reserved.')).toBeInTheDocument();
  });
});
