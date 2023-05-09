import React from 'react';
import { IconButton, Toolbar, Box } from "@mui/material";
import { Menu } from "@mui/icons-material";
import SearchBar from "./SearchBar";
import StyledAppBar from "./StyledAppBar";

interface HeaderProps {
  isMenuOpen: boolean;
  isMobile: boolean;
  menuWidth: number;
  handleOpenMenu: () => void;
}

const Header = ({
  isMenuOpen,
  handleOpenMenu,
  menuWidth,
  isMobile,
}: HeaderProps) => {
  return (
    <StyledAppBar isMenuOpen={isMenuOpen} menuWidth={menuWidth}>
      <Toolbar sx={{ bgcolor: "#fff", color: "#000", display: "flex" }}>
        <IconButton
          color="inherit"
          aria-label="open menu"
          onClick={handleOpenMenu}
          edge="start"
          sx={{
            marginRight: 5,
            ...(isMenuOpen && { display: "none" }),
          }}
        >
          <Menu />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: isMobile ? "flex-start" : "center",
            }}
          >
            <SearchBar />
          </Box>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
