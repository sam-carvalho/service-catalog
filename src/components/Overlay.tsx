import * as React from "react";
import { styled } from "@mui/material/styles";

interface OverlayProps {
  isMenuOpen: boolean;
  isMobile: boolean;
}

const Overlay = styled("div")<OverlayProps>(({ isMenuOpen, isMobile }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  opacity: isMenuOpen && isMobile ? 1 : 0,
  transition: "opacity 0.2s ease",
  zIndex: isMenuOpen && isMobile ? 1200 : -1,
}));

export default Overlay;
