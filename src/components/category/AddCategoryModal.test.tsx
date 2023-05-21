import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import AddCategoryModal from "./AddCategoryModal";
import useCategories from "../../hooks/useCategories";

jest.mock("../../hooks/useCategories");

describe("AddCategoryModal", () => {
  const mockHandleModalClose = jest.fn();
  const mockSetSelectedCategory = jest.fn();
  const mockSetSelectedCategoryId = jest.fn();
  const mockAddCategory = jest.fn();

  beforeEach(() => {
    (useCategories as jest.Mock).mockReturnValue({
      addCategory: mockAddCategory,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render AddCategoryModal", () => {
    const { getByTestId } = render(
      <AddCategoryModal
        isModalOpen={true}
        handleModalClose={mockHandleModalClose}
      />
    );
    expect(getByTestId("add-category-modal")).toBeInTheDocument();
  });

  it("should call handleModalClose on cancel button click", () => {
    const { getByText } = render(
      <AddCategoryModal
        isModalOpen={true}
        handleModalClose={mockHandleModalClose}
      />
    );
    fireEvent.click(getByText("Cancel"));
    expect(mockHandleModalClose).toHaveBeenCalledTimes(1);
  });

  it("should call handleAddCategory on form submit", async () => {
    const newCategory = { id: "1", name: "New Category" };

    mockAddCategory.mockResolvedValue(newCategory);

    const { getByText, getByLabelText } = render(
      <AddCategoryModal
        isModalOpen={true}
        isFromAutocomplete
        handleModalClose={mockHandleModalClose}
        setSelectedCategory={mockSetSelectedCategory}
        setSelectedCategoryId={mockSetSelectedCategoryId}
      />
    );

    fireEvent.change(getByLabelText("Category name"), {
      target: { value: "New Category" },
    });

    fireEvent.click(getByText("Save"));

    await act(async () => {
      fireEvent.submit(getByText("Save"));
    });

    expect(mockAddCategory).toHaveBeenCalledWith("New Category");
    expect(mockSetSelectedCategory).toHaveBeenCalledWith(newCategory);
    expect(mockSetSelectedCategoryId).toHaveBeenCalledWith(newCategory.id);
  });
});
