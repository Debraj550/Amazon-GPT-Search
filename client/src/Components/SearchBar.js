import React, { useState, useEffect } from "react";
import { useProductContext } from "../utils/ProductContext";

const SearchBar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [search, setSearch] = useState("");
  const { allProduct, updateAllProduct } = useProductContext();
  const handleSearch = () => {
    const filteredData = allProduct.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    updateAllProduct(filteredData);
  };

  return (
    <div className="search-bar m-auto w-4/12 relative ">
      <div className="w-full">
        <input
          className={`p-2 border-2 border-black/60 w-full rounded-lg ${
            isFixed ? "fixed w-4/12" : ""
          } top-0`}
          placeholder="Search a product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button onClick={() => handleSearch()}>
          <i className="fa-solid fa-magnifying-glass absolute right-0 top-0 bottom-0 text-gray-600 font-bold px-3 m-auto h-fit"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
