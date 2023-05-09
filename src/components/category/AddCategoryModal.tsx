import React, { useState } from 'react';
import { Modal, Button, TextField, Box, Typography } from "@mui/material";

interface CategoryModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
  handleAddCategory: (categoryName: string) => void;
}

const AddCategoryModal = ({
  isModalOpen,
  handleModalClose,
  handleAddCategory,
}: CategoryModalProps) => {
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleCategoryNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCategoryName(event.target.value);
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    padding: "24px",
    outline: "none",
    borderRadius: "4px",
    width: 500,
  };

  const buttonGroupStyle = {
    marginTop: "16px",
    display: "flex",
    justifyContent: "flex-end",
  };

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <Box sx={formStyle}>
        <form onSubmit={handleSave}>
          <Typography variant="h6" component="h2">
            Create category
          </Typography>
          <Box sx={{ paddingTop: 1 }}>
            <TextField
              required
              fullWidth
              label="Category name"
              value={newCategoryName}
              onChange={handleCategoryNameChange}
              variant="standard"
            />
          </Box>
          <Box sx={buttonGroupStyle}>
            <Button
              onClick={handleModalClose}
              variant="outlined"
              style={{ marginRight: "8px" }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
