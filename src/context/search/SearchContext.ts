import React, { createContext } from "react";

type SearchContextProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = createContext<SearchContextProps>({
  searchQuery: "",
  setSearchQuery: () => {},
});
