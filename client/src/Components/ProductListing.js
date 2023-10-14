import React, { useState } from "react";
import ProductCard from "./ProductCard.js";
import SearchBar from "./SearchBar.js";
import { useProductContext } from "../utils/ProductContext.js";

const ProductListing = () => {
  const { filteredProduct } = useProductContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = filteredProduct.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-4">
      <SearchBar />
      <div className="p-4 flex">
        <div className="w-2/12 border-r-2">Filters</div>
        <div className="products w-10/12 pl-4 pr-2">
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
      </div>
    </div>
  );
};

export default ProductListing;
