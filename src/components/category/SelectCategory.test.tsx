import React from "react";
import { render } from "@testing-library/react";
import SelectCategory from "./SelectCategory";
import useCategories from "../../hooks/useCategories";

jest.mock("../../hooks/useCategories");

describe("SelectCategory", () => {
  const mockSetSelectedCategory = jest.fn();
  const mockSetSelectedCategoryId = jest.fn();
  const mockHandleCategoryChange = jest.fn();
  const mockFetchCategories = jest.fn();

  const mockCategories = [
    { id: "1", name: "Category 1" },
    { id: "2", name: "Category 2" },
  ];

  beforeEach(() => {
    (useCategories as jest.Mock).mockReturnValue({
      categories: mockCategories,
      fetchCategories: mockFetchCategories,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render SelectCategory", () => {
    const { getByPlaceholderText } = render(
      <SelectCategory
        selectedCategory={null}
        setSelectedCategory={mockSetSelectedCategory}
        setSelectedCategoryId={mockSetSelectedCategoryId}
        handleCategoryChange={mockHandleCategoryChange}
      />
    );
    expect(getByPlaceholderText("Select Category")).toBeInTheDocument();
  });
});
