import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Button, Box } from "@mui/material";
import useCategories from "../../hooks/useCategories";
import AddCategoryModal from "./AddCategoryModal";
import { Category } from "src/interfaces";

interface SelectCategoryProps {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  setSelectedCategoryId: (categoryId: string) => void;
  handleCategoryChange: (
    event: React.ChangeEvent<{}>,
    category: Category | null
  ) => void;
}

const SelectCategory = ({
  selectedCategory,
  setSelectedCategoryId,
  setSelectedCategory,
  handleCategoryChange,
}: SelectCategoryProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const { categories, fetchCategories } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };

  const isOptionEqualToValue = (
    option: Category | null,
    value: Category | null
  ) => option?.id === value?.id && option?.name === value?.name;

  return (
    <>
      <Autocomplete
        value={selectedCategory}
        onChange={handleCategoryChange}
        options={categories}
        getOptionLabel={(option) => option.name}
        size="small"
        noOptionsText={
          <Button onClick={handleOpenModal}>Create new category</Button>
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select Category"
            value={selectedCategory?.name || ""}
            onChange={handleOnChange}
            variant="outlined"
          />
        )}
        isOptionEqualToValue={isOptionEqualToValue}
      />
      <AddCategoryModal
        isModalOpen={isModalOpen}
        isFromAutocomplete
        categoryName={newCategoryName}
        handleModalClose={() => setIsModalOpen(false)}
        setSelectedCategory={setSelectedCategory}
        setSelectedCategoryId={setSelectedCategoryId}
      />
    </>
  );
};

export default SelectCategory;
