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
  PushPin,
} from "@mui/icons-material";
import AddCategoryModal from "./category/AddCategoryModal";
import PinnedDialog from "./pinned/PinnedDialog";
import ServiceDialog from "./service/ServiceDialog";
import { toSentenceCase } from "../utils";
import { useCategory } from "../context";

interface MenuProps {
  isMenuOpen: boolean;
}

const MenuList = ({ isMenuOpen }: MenuProps) => {
  const [isListOpen, setIsListOpen] = useState(true);
  const { categories } = useCategory();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isPinnedDialogOpen, setIsPinnedDialogOpen] = useState(false);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const shouldExpand = isMenuOpen && isListOpen;

  const handleListClick = () => {
    setIsListOpen(!isListOpen);
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
        <ListItemText primary="Categories" />
        {shouldExpand ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={shouldExpand} timeout="auto" unmountOnExit>
        <List component="div" sx={{ pl: "55px" }}>
          {Array.isArray(categories) &&
            categories.length > 0 &&
            categories.map((category) => (
              <ListItem key={category.id}>
                <ListItemText primary={toSentenceCase(category.name)} />
              </ListItem>
            ))}
          <ListItemButton onClick={() => setIsCategoryModalOpen(true)}>
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
          isModalOpen={isCategoryModalOpen}
          handleModalClose={() => setIsCategoryModalOpen(false)}
        />
      </Collapse>
      <ListItemButton onClick={() => setIsServiceDialogOpen(true)}>
        <ListItemIcon>
          <AddHome />
        </ListItemIcon>
        <ListItemText primary="Add service" />
      </ListItemButton>
      <ServiceDialog
        isDialogOpen={isServiceDialogOpen}
        handleDialogClose={() => setIsServiceDialogOpen(false)}
      />
      <ListItemButton onClick={() => setIsPinnedDialogOpen(true)}>
        <ListItemIcon>
          <PushPin />
        </ListItemIcon>
        <ListItemText primary="Pinned Services" />
      </ListItemButton>
      <PinnedDialog
        isDialogOpen={isPinnedDialogOpen}
        handleDialogClose={() => setIsPinnedDialogOpen(false)}
      />
    </List>
  );
};

export default MenuList;
