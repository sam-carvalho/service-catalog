
import { render, screen } from '@testing-library/react';
import Header from './Header';
import React from 'react';

describe('Header', () => {
  test('should render the header and a search bar', () => {
    render(<Header />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });
});
