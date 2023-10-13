import React from "react";

const ProductListing = () => {
  return (
    <div className="p-4">
      <div className="search-bar m-auto w-4/12 relative ">
        <div className="w-full">
          <input
            className="p-2 border-2 w-full rounded-lg"
            placeholder="Search"
          ></input>
          <button>
            <i className="fa-solid fa-magnifying-glass absolute right-0 top-0 bottom-0 text-gray-600 font-bold px-3 m-auto h-fit"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
