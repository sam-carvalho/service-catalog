
import { render, screen } from '@testing-library/react';
import Header from './Header';
import React from 'react';

const mockHandleOpenMenu = jest.fn();

describe("Header", () => {
  test("should render the header and a search bar", () => {
    render(
      <Header
        menuWidth={240}
        isMenuOpen={false}
        handleOpenMenu={mockHandleOpenMenu}
        isMobile={false}
      />
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });
});
