import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#000000DE",
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;
