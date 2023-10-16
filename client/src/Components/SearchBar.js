import React, { useState, useEffect } from "react";
import { useProductContext } from "../utils/ProductContext";
import axios from "axios";
import YoutubeSuggestions from "./YoutubeSuggestions.js";
import { useAsyncError } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const { updateFilteredProduct, allProduct } = useProductContext();
  const [youtubeSuggestions, setYoutubeSuggestions] = useState([]);
  const [show, setShow] = useState(false);

  const handleSearch = async () => {
    try {
      if (search.length === 0) {
        updateFilteredProduct(allProduct);
        return;
      }
      const response = await axios.get(
        `http://127.0.0.1:8000/search-product/${search}`
      );
      const data = response.data;
      updateFilteredProduct(data);
      const ytresponse = await axios.get(
        `http://127.0.0.1:8000/videos/${search}`
      );
      const ytdata = ytresponse.data;
      setYoutubeSuggestions(ytdata);
    } catch (e) {
      console.log(e);
    }
  };
  const handleShow = () => {
    setShow((prev) => !prev);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar m-auto w-4/12 relative flex">
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
      <div className="px-4 fixed right-0">
        <button
          className="mx-2 px-4 right-0 bg-red-500 text-white font-bold rounded-xl"
          onClick={handleShow}
        >
          This
        </button>
        {show && (
          <div className="">
            <YoutubeSuggestions youtubeSuggestions={youtubeSuggestions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
