import React, { useState, useEffect } from "react";
import { Modal, Button, TextField, Box, InputLabel } from "@mui/material";
import { grey } from "@mui/material/colors";
import useCategories from "src/hooks/useCategories";
import { Category } from "src/interfaces";

interface CategoryModalProps {
  isModalOpen: boolean;
  isFromAutocomplete?: boolean;
  categoryName?: string;
  handleModalClose: () => void;
  setSelectedCategory?: (category: Category | null) => void;
  setSelectedCategoryId?: (categoryId: string) => void;
}

const AddCategoryModal = ({
  isModalOpen,
  isFromAutocomplete = false,
  categoryName,
  handleModalClose,
  setSelectedCategory,
  setSelectedCategoryId,
}: CategoryModalProps) => {
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const { addCategory } = useCategories();

  useEffect(() => {
    if (categoryName) {
      setNewCategoryName(categoryName);
    }
  }, [categoryName]);

  const handleAddCategory = async (categoryName: string) => {
    const newCategory = await addCategory(categoryName);
    if (isFromAutocomplete) {
      setSelectedCategory(newCategory);
      setSelectedCategoryId(newCategory?.id);
    }
  };

  const handleCategoryNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCategoryName(event.target.value);
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleAddCategory(newCategoryName);
    setNewCategoryName("");
    handleModalClose();
  };

  const formStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    outline: "none",
    borderRadius: "4px",
    width: 360,
    height: 220,
  };

  const buttonGroupStyle = {
    margin: "20px",
    display: "flex",
    justifyContent: "flex-end",
  };

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <Box sx={formStyle}>
        <form onSubmit={handleSave}>
          <Box sx={{ padding: 2.4, marginTop: 2 }}>
            <InputLabel
              sx={{ fontSize: 14, fontWeight: "bold", color: grey[900] }}
            >
              Category name
            </InputLabel>
            <TextField
              required
              fullWidth
              value={newCategoryName}
              onChange={handleCategoryNameChange}
              variant="outlined"
              size="small"
              sx={{ paddingTop: 2 }}
            />
          </Box>
          <Box sx={buttonGroupStyle}>
            <Button
              onClick={handleModalClose}
              variant="outlined"
              style={{ marginRight: "10px" }}
              size="small"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" size="small">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
