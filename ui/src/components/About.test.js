import React from 'react';
import { render, screen } from '@testing-library/react';
import { Helmet } from 'react-helmet';
import About from './About';

describe('About component', () => {
  test('renders without errors', () => {
    render(<About />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('sets the correct Helmet metadata', () => {
    render(<About />);
    const helmet = Helmet.peek();
    expect(helmet.title).toBe('About');
    expect(helmet.metaTags).toContainEqual(
      expect.objectContaining({
        name: 'description',
        content: 'About the artist. Read about Mick Gooding\'s history and influences. View photos of him and notable artists he has met.',
      })
    );
  });

  test('displays the expected links', () => {
    render(<About />);
    expect(screen.getByRole('link', { name: 'Mail icon contact@mickgooding.co.uk', href: 'mailto:contact@mickgooding.co.uk' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Instagram icon micksbestart', href: 'https://www.instagram.com/micksbestart' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Facebook icon micksart', href: 'https://facebook.com/micksart' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Etsy', href: 'https://www.etsy.com/shop/MickGoodingCanvasArt' })).toBeInTheDocument();
  });

  test('renders the carousels correctly', () => {
    render(<About />); 
    const carousels = screen.getAllByRole('region', { name: 'Carousel' })
    expect(carousels).toHaveLength(4);   
    expect(screen.getAllByRole('img')).toHaveLength(16);
  });
});
