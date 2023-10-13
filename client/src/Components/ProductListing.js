import React from "react";

const ProductListing = () => {
  return (
    <div className="p-4">
      <div className="search-bar m-auto w-4/12 relative">
        <div className="w-full relative">
          <input
            className="p-2 border-2 w-full rounded-lg"
            placeholder="Search"
          ></input>
          <i className="fa-solid fa-magnifying-glass absolute translate-y-["></i>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
