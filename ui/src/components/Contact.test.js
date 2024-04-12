import React from 'react';
import { render, screen } from '@testing-library/react';
import { Helmet } from 'react-helmet';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import Contact from './Contact';

describe('Contact component', () => {
  test('renders without errors', () => {
    render(<Contact />);
  });

  test('sets the correct Helmet metadata', () => {
    render(<Contact />);
    const helmet = Helmet.peek();
    expect(helmet.title).toBe('Contact');
    expect(helmet.metaTags).toContainEqual(
      expect.objectContaining({
        name: 'description',
        content: 'Contains information about the prints sold, Instagram, Facebook and email contact links.',
      })
    );
  });

  test('displays the print information', () => {
    render(<Contact />);
    expect(screen.getByText('Choose your print')).toBeInTheDocument();
    expect(screen.getByText('Canvas prints are produced from original watercolour or acrylic paintings done by the artist, Mick Gooding. The canvas is stretched over 18 mm pine bars, varnished and ready to hang. Prices include free P&P in the UK only.')).toBeInTheDocument();
  });

  test('displays the contact information', () => {
    render(<Contact />);
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
    expect(screen.getByText('For all enquiries reach out by email.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Mail icon contact@mickgooding.co.uk', href: 'mailto:contact@mickgooding.co.uk' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Instagram icon micksbestart', href: 'https://www.instagram.com/micksbestart' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Facebook icon micksart', href: 'https://facebook.com/micksart' })).toBeInTheDocument();
  });
});
