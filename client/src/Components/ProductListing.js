import React from "react";
import ProductCard from "./ProductCard.js";

const ProductListing = ({ allProduct }) => {
  return (
    <div className="p-4">
      <div className="search-bar m-auto w-4/12 relative ">
        <div className="w-full">
          <input
            className="p-2 border-2 w-full rounded-lg"
            placeholder="Search a product"
          ></input>
          <button>
            <i className="fa-solid fa-magnifying-glass absolute right-0 top-0 bottom-0 text-gray-600 font-bold px-3 m-auto h-fit"></i>
          </button>
        </div>
      </div>
      <div className="p-4 flex">
        <div className="w-2/12 border-r-2">Filters</div>
        <div className="products w-10/12 pl-4 pr-2">
          {allProduct.length > 0 ? (
            allProduct.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))
          ) : (
            <h1>No data found.</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
