import { createContext } from "react";

export interface SearchContextValue {
  blogSearch: string;
  setBlogSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextValue>({
  blogSearch: "",
  setBlogSearch: () => undefined,
});
