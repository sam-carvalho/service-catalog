import React from 'react';
import {
  Divider,
  Toolbar,
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import MenuList from "./MenuList";
import { openedMenuMixin, closedMenuMixin } from "src/utils";

interface DrawerProps extends MuiDrawerProps {
  isMenuOpen: boolean;
  menuWidth: number;
}

interface SideNavProps {
  isMenuOpen: boolean;
  menuWidth: number;
  handleCloseMenu: () => void;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "isMenuOpen" && prop !== "menuWidth",
})<DrawerProps>(({ theme, isMenuOpen, menuWidth }) => ({
  width: menuWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(isMenuOpen ? openedMenuMixin(theme, menuWidth) : closedMenuMixin(theme)),
  "& .MuiDrawer-paper": isMenuOpen
    ? openedMenuMixin(theme, menuWidth)
    : closedMenuMixin(theme),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const SideNav = ({ isMenuOpen, menuWidth, handleCloseMenu }: SideNavProps) => {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" isMenuOpen={isMenuOpen} menuWidth={menuWidth}>
      <DrawerHeader>
        {isMenuOpen && (
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image src="/docker.png" alt="" width="40" height="40" />
            <Typography variant="h6" component="span" sx={{ ml: 2 }}>
              <Link href="/">Serverly</Link>
            </Typography>
          </Toolbar>
        )}
        <IconButton onClick={handleCloseMenu}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <MenuList isMenuOpen={isMenuOpen} />
    </Drawer>
  );
};

export default SideNav;
