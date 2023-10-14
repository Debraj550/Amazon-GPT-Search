import React, { useState } from "react";
import { useProductContext } from "../utils/ProductContext";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const { filterProducts } = useProductContext();

  const handleSearch = () => {
    filterProducts(search);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="search-bar m-auto w-4/12 relative ">
      <div className="w-full">
        <input
          className={`p-2 border-2 border-black/60 w-full rounded-lg `}
          placeholder="Search a product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
        <button onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass absolute right-0 top-0 bottom-0 text-gray-600 font-bold px-3 m-auto h-fit"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
