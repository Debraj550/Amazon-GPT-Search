import React, { useState } from "react";
import ProductCard from "./ProductCard.js";
import axios from "axios";
import YoutubeSuggestions from "./YoutubeSuggestions.js";
import { useProductContext } from "../utils/ProductContext.js";

const ProductListing = () => {
  const { filteredProduct } = useProductContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProduct.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);

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
      console.log(ytdata);
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
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-4">
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
      </div>
      <div className="p-4 flex">
        <div className="w-2/12 border-r-2">Filters</div>
        <div className="products w-8/12 pl-4 pr-2">
          <div>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))
            ) : (
              <h1>No data found.</h1>
            )}
          </div>

          <div className="pagination flex gap-2 items-center justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="font-bold">{currentPage}</span>
            <span className="">
              {currentPage + 1 <= filteredProduct.length && currentPage + 1}
            </span>
            ......
            <span className="">{filteredProduct.length}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <div className="suggestions w-2/12 border-l-2 pl-4 flex flex-col  items-center gap-2">
          <div className="px-4 ">
            <button
              className="mx-2 px-4  bg-red-500 text-white font-bold rounded-xl"
              onClick={handleShow}
            >
              Explore Reviews
            </button>
          </div>
          {show &&
            (youtubeSuggestions.length > 0 ? (
              <div className="">
                <YoutubeSuggestions youtubeSuggestions={youtubeSuggestions} />
              </div>
            ) : (
              <div className="bg-neutral-200 text-center p-2">
                No Recommendations
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
