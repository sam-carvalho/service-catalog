import React, { useState } from 'react';
import {
  Modal,
  Button,
  TextField,
  Box,
  Divider,
  InputLabel,
  IconButton,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Close } from "@mui/icons-material";

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
    outline: "none",
    borderRadius: "4px",
    width: 360,
    height: 280,
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
          <Box>
            <h5 style={{ margin: 18 }}>Create new category</h5>
            <IconButton
              aria-label="close"
              onClick={handleModalClose}
              sx={{
                position: "absolute",
                right: 7,
                top: 8,
                color: (theme) => theme.palette.grey[600],
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
          <Divider />
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
