import React, { useState, ReactNode } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./Header";
import SideNav from "./SideNav";
import Overlay from "./Overlay";

interface AppShellProps {
  children: ReactNode;
  isMobile: boolean;
  menuWidth?: number;
}

export default function AppShell({
  children,
  isMobile,
  menuWidth = 240,
}: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(!isMobile ?? false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCloseOverlayMenu = () => {
    if (isMenuOpen && isMobile) {
      handleCloseMenu();
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Overlay
        isMenuOpen={isMenuOpen}
        isMobile={isMobile}
        onClick={handleCloseOverlayMenu}
      />
      <Header
        isMenuOpen={isMenuOpen}
        handleOpenMenu={handleOpenMenu}
        menuWidth={menuWidth}
        isMobile={isMobile}
      />
      <SideNav
        isMenuOpen={isMenuOpen}
        handleCloseMenu={handleCloseMenu}
        menuWidth={menuWidth}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: { xs: 5, md: 8 },
          marginLeft: { xs: 3, md: 4 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
