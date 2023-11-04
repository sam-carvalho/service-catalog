import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  beforeEach(() => {
    render(<SearchBar />);
  });

  test('should render the search bar', () => {
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  test('should render a search icon', () => {
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  test('should render an input field', () => {
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
});
