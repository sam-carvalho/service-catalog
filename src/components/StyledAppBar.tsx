import React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

interface AppBarProps extends MuiAppBarProps {
  isMenuOpen: boolean;
  menuWidth: number;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "isMenuOpen" && prop !== "menuWidth",
})<AppBarProps>(({ theme, isMenuOpen, menuWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isMenuOpen && {
    marginLeft: menuWidth,
    width: `calc(100% - ${menuWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  boxShadow: "none",
  borderBottom: "1.5px solid #ddd",
}));

const StyledAppBar = ({ isMenuOpen, menuWidth, children }: AppBarProps) => {
  return (
    <AppBar
      position="fixed"
      data-testid="header"
      isMenuOpen={isMenuOpen}
      menuWidth={menuWidth}
    >
      {children}
    </AppBar>
  );
};

export default StyledAppBar;
