import React, { useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import { SearchContext } from "@/context/searchContext";

export const SearchInput: React.FC = React.memo(() => {
  const { blogSearch, setBlogSearch } = useContext(SearchContext);
  const router = useRouter();

  const handleChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setBlogSearch(e.target.value);
    },
    [setBlogSearch],
  );

  const handleClickSearchButton = useCallback(() => {
    router.push({
      pathname: "/blogs/search/", //URL
      query: { keyword: blogSearch }, //検索クエリ
    });
  }, [blogSearch, router]);

  return (
    <div className="flex flex-row my-5 shadow-lg rounded-xl">
      <input
        id="search-keyword"
        type="text"
        placeholder={"Search..."}
        value={blogSearch}
        onChange={handleChangeKeyword}
        className="w-72 h-11 pl-4 rounded-l-xl"
      />
      <div className="flex bg-blue-300 w-12 justify-center items-center rounded-r-xl">
        <button className="" onClick={handleClickSearchButton}>
          <BsSearch className="text-2xl" />
        </button>
      </div>
    </div>
  );
});

SearchInput.displayName = "SearchInput";
