import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './Home';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('./PaintingGallery', () => (props) => (
  <div data-testid="painting-gallery" onClick={props.onClickMethod}>
    Painting Gallery
  </div>
));

describe('Home component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without errors', () => {
    render(<Home />);
    expect(screen.getByAltText('Mick Gooding Art Logo')).toBeInTheDocument();
    expect(screen.getByTestId('painting-gallery')).toBeInTheDocument();
  });

  test('sets the correct Helmet metadata', () => {
    render(<Home />);
    const helmet = Helmet.peek();
    expect(helmet.title).toBe('Mick Gooding Art');
    expect(helmet.metaTags).toContainEqual(
      expect.objectContaining({
        name: 'description',
        content: 'View and purchase Mick Gooding\'s original artwork.',
      })
    );
  });

  test('passes the correct onClickMethod to the PaintingGallery component', () => {
    const navigateMock = jest.fn();
    useNavigate.mockImplementation(() => navigateMock);
    render(<Home />);
    const paintingGallery = screen.getByTestId('painting-gallery');
    fireEvent.click(paintingGallery);
    expect(navigateMock).toHaveBeenCalledWith('/s');
  });
});
