import React from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import { useSearch } from "../context";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: 250,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  border: `1px solid #ddd`,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "70ch",
    },
  },
}));

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Search data-testid="search-bar">
      <SearchIconWrapper data-testid="search-icon">
        <SearchIcon color="action" />
      </SearchIconWrapper>
      <StyledInputBase
        fullWidth
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        data-testid="search-input"
        type="search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </Search>
  );
};

export default SearchBar;
