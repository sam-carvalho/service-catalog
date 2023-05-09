import React, { useState } from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  Home,
  AddHome,
  ExpandMore,
  ExpandLess,
  AddCircleOutline,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import AddCategoryModal from "./category/AddCategoryModal";
import { toSentenceCase } from "src/utils";
import useCategories from "../hooks/useCategories";

interface MenuProps {
  isMenuOpen: boolean;
}

const MenuList = ({ isMenuOpen }: MenuProps) => {
  const router = useRouter();
  const [isListOpen, setIsListOpen] = useState(true);
  const { categories, addCategory } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldExpand = isMenuOpen && isListOpen;

  const handleListClick = () => {
    setIsListOpen(!isListOpen);
  };

  const handleAddCategory = async (categoryName: string) => {
    await addCategory(categoryName);
    setIsModalOpen(false);
  };

  const handleCreateServiceClick = () => {
    router.push("/create-service");
  };

  return (
    <List
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        bgcolor: "background.paper",
        height: "calc(100vh - 168px)",
      }}
      component="nav"
    >
      <ListItemButton onClick={handleListClick}>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="My services" />
        {shouldExpand ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={shouldExpand} timeout="auto" unmountOnExit>
        <List component="div" sx={{ pl: "55px" }}>
          {categories.map((category) => (
            <ListItem key={category.id}>
              <ListItemText primary={toSentenceCase(category.name)} />
            </ListItem>
          ))}
          <ListItemButton onClick={() => setIsModalOpen(true)}>
            <ListItemText
              primary={
                <Box component="span" display="flex" alignItems="center">
                  Add category
                  <AddCircleOutline
                    sx={{ fontSize: 14, marginTop: "1px", marginLeft: 0.5 }}
                  />
                </Box>
              }
            />
          </ListItemButton>
        </List>
        <AddCategoryModal
          isModalOpen={isModalOpen}
          handleModalClose={() => setIsModalOpen(false)}
          handleAddCategory={handleAddCategory}
        />
      </Collapse>
      <ListItemButton onClick={handleCreateServiceClick}>
        <ListItemIcon>
          <AddHome />
        </ListItemIcon>
        <ListItemText primary="Add service" />
      </ListItemButton>
    </List>
  );
};

export default MenuList;
